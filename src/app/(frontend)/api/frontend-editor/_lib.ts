import type { FrontendEditorUser } from '@/lib/frontendEditor/access'
import { canUseFrontendEditor } from '@/lib/frontendEditor/access'
import { getPayloadClient } from '@/lib/payload'

export async function getFrontendEditorContext(request: Request) {
  const payload = await getPayloadClient()
  const { user } = await payload.auth({ headers: request.headers })
  const editorUser = user as FrontendEditorUser | null

  if (!editorUser) {
    return { error: Response.json({ error: 'Authentication required' }, { status: 401 }) }
  }

  if (!canUseFrontendEditor(editorUser)) {
    return {
      error: Response.json(
        { error: 'Your account does not have permission to edit site content.' },
        { status: 403 },
      ),
    }
  }

  return { payload, user: editorUser }
}

export function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'The request could not be completed.'
}
