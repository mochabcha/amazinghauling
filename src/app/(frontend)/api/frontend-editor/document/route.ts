import { revalidatePath } from 'next/cache'
import { extractEditableBlocks, setValueAtPath } from '@/lib/frontendEditor/fields'
import type { FrontendEditorDocument } from '@/lib/frontendEditor/types'
import { getErrorMessage, getFrontendEditorContext } from '../_lib'

export const dynamic = 'force-dynamic'

function documentResponse(page: {
  id: string
  layout?: unknown
  slug: string
  title: string
  updatedAt: string
}): FrontendEditorDocument {
  return {
    blocks: extractEditableBlocks(page.layout),
    id: page.id,
    payloadURL: `/admin/collections/pages/${page.id}`,
    scope: 'page',
    slug: page.slug,
    title: page.title,
    updatedAt: page.updatedAt,
  }
}

export async function GET(request: Request) {
  const context = await getFrontendEditorContext(request)
  if ('error' in context) return context.error

  const id = new URL(request.url).searchParams.get('id')
  if (!id) return Response.json({ error: 'A page id is required.' }, { status: 400 })

  try {
    const page = await context.payload.findByID({
      collection: 'pages',
      id,
      depth: 2,
      draft: false,
      overrideAccess: false,
      user: context.user,
    })

    return Response.json({ document: documentResponse(page) })
  } catch (error) {
    return Response.json({ error: getErrorMessage(error) }, { status: 404 })
  }
}

type PatchBody = {
  path?: unknown
  updatedAt?: unknown
  value?: unknown
}

export async function PATCH(request: Request) {
  const context = await getFrontendEditorContext(request)
  if ('error' in context) return context.error

  const id = new URL(request.url).searchParams.get('id')
  if (!id) return Response.json({ error: 'A page id is required.' }, { status: 400 })

  let body: PatchBody
  try {
    body = (await request.json()) as PatchBody
  } catch {
    return Response.json({ error: 'The edit payload is not valid JSON.' }, { status: 400 })
  }

  if (typeof body.path !== 'string' || typeof body.updatedAt !== 'string') {
    return Response.json(
      { error: 'A field path and document version are required.' },
      { status: 400 },
    )
  }

  try {
    const page = await context.payload.findByID({
      collection: 'pages',
      id,
      depth: 2,
      draft: false,
      overrideAccess: false,
      user: context.user,
    })

    if (page.updatedAt !== body.updatedAt) {
      return Response.json(
        {
          code: 'VERSION_CONFLICT',
          error: 'This page changed after the editor opened. Reload it before saving.',
        },
        { status: 409 },
      )
    }

    const editableField = extractEditableBlocks(page.layout)
      .flatMap((block) => block.fields)
      .find((field) => field.path === body.path && field.editable)

    if (!editableField) {
      return Response.json(
        { error: 'This field is not available in the frontend editor.' },
        { status: 400 },
      )
    }

    let nextValue: string
    if (editableField.kind === 'text' || editableField.kind === 'url') {
      if (typeof body.value !== 'string' || body.value.length > 20_000) {
        return Response.json(
          { error: 'Text edits must be 20,000 characters or less.' },
          { status: 400 },
        )
      }
      nextValue = body.value
    } else if (editableField.kind === 'media') {
      if (typeof body.value !== 'string') {
        return Response.json({ error: 'A media id is required.' }, { status: 400 })
      }

      const media = await context.payload.findByID({
        collection: 'media',
        id: body.value,
        depth: 0,
        overrideAccess: false,
        user: context.user,
      })
      nextValue = media.id
    } else {
      return Response.json({ error: 'This field must be edited in Payload.' }, { status: 400 })
    }

    const layout = structuredClone(page.layout || [])
    if (!setValueAtPath({ layout }, body.path, nextValue)) {
      return Response.json({ error: 'The selected field no longer exists.' }, { status: 409 })
    }

    const updatedPage = await context.payload.update({
      collection: 'pages',
      id,
      data: { layout },
      depth: 2,
      draft: false,
      overrideAccess: false,
      user: context.user,
    })

    revalidatePath('/', 'layout')

    return Response.json({ document: documentResponse(updatedPage) })
  } catch (error) {
    return Response.json({ error: getErrorMessage(error) }, { status: 500 })
  }
}
