import path from 'path'
import fs from 'fs/promises'

import type { Payload } from 'payload'
import { uploadFileToCloudinary } from '@/lib/cloudinary'

const imageRoot = path.join(process.cwd(), 'public', 'images')
const brandRoot = path.join(process.cwd(), 'public', 'brand')

export const mediaSeedLibrary = {
  logo: {
    filePath: path.join(brandRoot, 'amazing-hauling-logo.png'),
    fileName: 'amazing-hauling-logo.png',
    alt: 'Amazing Hauling of North Florida logo',
    caption: 'Amazing Hauling of North Florida brand mark',
  },
  homeHero: {
    filePath: path.join(imageRoot, 'Dump_trucks_driving_202604011415.jpeg'),
    fileName: 'Dump_trucks_driving_202604011415.jpeg',
    alt: 'Amazing Hauling dump trucks driving on a North Florida job route',
    caption: 'Dump trucks driving in convoy',
  },
  convoy: {
    filePath: path.join(imageRoot, 'Dump_trucks_driving_202604011109.jpeg'),
    fileName: 'Dump_trucks_driving_202604011109.jpeg',
    alt: 'Amazing Hauling dump truck convoy supporting active construction work',
    caption: 'Dump trucks supporting a live project',
  },
  convoyAlt: {
    filePath: path.join(imageRoot, 'Dump_trucks_driving_202604011415_2.jpeg'),
    fileName: 'Dump_trucks_driving_202604011415_2.jpeg',
    alt: 'Dump trucks traveling between plant and jobsite in North Florida',
    caption: 'Hauling fleet in transit',
  },
  convoyWide: {
    filePath: path.join(imageRoot, 'Dump_trucks_driving_202604011415_3.jpeg'),
    fileName: 'Dump_trucks_driving_202604011415_3.jpeg',
    alt: 'Multiple dump trucks lined up for hauling support',
    caption: 'Multi-truck hauling support',
  },
  asphaltAction: {
    filePath: path.join(imageRoot, 'Truck_doing_asphalt_202604011415.jpeg'),
    fileName: 'Truck_doing_asphalt_202604011415.jpeg',
    alt: 'Dump truck hauling asphalt for paving operations',
    caption: 'Asphalt hauling support',
  },
  asphaltPaving: {
    filePath: path.join(imageRoot, 'asphalt-paving.jpeg'),
    fileName: 'asphalt-paving.jpeg',
    alt: 'Asphalt paving crew supported by hauling services',
    caption: 'Asphalt paving operations',
  },
  materialsHauling: {
    filePath: path.join(imageRoot, 'materials-hauling.png'),
    fileName: 'materials-hauling.png',
    alt: 'Materials hauling support for construction crews',
    caption: 'Materials hauling support',
  },
  fleet: {
    filePath: path.join(imageRoot, 'fleet.png'),
    fileName: 'fleet.png',
    alt: 'Amazing Hauling dump truck fleet',
    caption: 'Amazing Hauling fleet',
  },
  fleetAlt: {
    filePath: path.join(imageRoot, 'fleet-two.png'),
    fileName: 'fleet-two.png',
    alt: 'Amazing Hauling fleet ready for dispatch',
    caption: 'Fleet staged for work',
  },
  worksite: {
    filePath: path.join(imageRoot, 'Worksite_image_of_202604011109.jpeg'),
    fileName: 'Worksite_image_of_202604011109.jpeg',
    alt: 'Active construction worksite served by Amazing Hauling',
    caption: 'North Florida construction worksite',
  },
  replacementTruck: {
    filePath: path.join(imageRoot, 'Replace_dump_truck_202604011415_2.jpeg'),
    fileName: 'Replace_dump_truck_202604011415_2.jpeg',
    alt: 'Replacement dump truck supporting hauling operations',
    caption: 'Dump truck at work',
  },
  replacementTruckAlt: {
    filePath: path.join(imageRoot, 'Replace_dump_truck_202604011415_3.jpeg'),
    fileName: 'Replace_dump_truck_202604011415_3.jpeg',
    alt: 'Dump truck staged to support contractor hauling needs',
    caption: 'Dump truck support equipment',
  },
  siteDetail: {
    filePath: path.join(imageRoot, 'IMG_0124.jpeg_202604011109.jpeg'),
    fileName: 'IMG_0124.jpeg_202604011109.jpeg',
    alt: 'Project site detail from Amazing Hauling work in North Florida',
    caption: 'Project work detail',
  },
  fieldPhoto: {
    filePath: path.join(imageRoot, 'IMG_1534.heic_202604011109.jpeg'),
    fileName: 'IMG_1534.heic_202604011109.jpeg',
    alt: 'Field hauling operations captured on site',
    caption: 'Field hauling operations',
  },
  dirtHaul: {
    filePath: path.join(imageRoot, 'more_images_like_202604011109.jpeg'),
    fileName: 'more_images_like_202604011109.jpeg',
    alt: 'Dump truck supporting dirt hauling and site development',
    caption: 'Dirt hauling support',
  },
} as const

export type MediaSeedKey = keyof typeof mediaSeedLibrary

interface SeedMediaAssetOptions {
  payload: Payload
  results?: string[]
}

export async function seedMediaAssets({ payload, results = [] }: SeedMediaAssetOptions) {
  const mediaMap = {} as Record<MediaSeedKey, string>

  for (const [key, asset] of Object.entries(mediaSeedLibrary) as Array<[MediaSeedKey, (typeof mediaSeedLibrary)[MediaSeedKey]]>) {
    const existing = await payload.find({
      collection: 'media',
      where: {
        filename: {
          equals: asset.fileName,
        },
      },
      limit: 1,
      depth: 0,
    })

    if (existing.totalDocs > 0) {
      const uploaded = await uploadFileToCloudinary(asset.filePath, {
        folder: 'amazing-hauling',
        publicId: path.parse(asset.fileName).name,
        tags: ['amazing-hauling', 'seeded-media'],
      })
      const fileStats = await fs.stat(asset.filePath)

      const updated = await payload.update({
        collection: 'media',
        id: existing.docs[0].id,
        data: {
          alt: asset.alt,
          caption: asset.caption,
          filename: asset.fileName,
          mimeType: asset.fileName.endsWith('.png') ? 'image/png' : 'image/jpeg',
          filesize: uploaded?.bytes || fileStats.size,
          width: uploaded?.width,
          height: uploaded?.height,
          url: uploaded?.secureUrl,
          thumbnailURL: uploaded?.secureUrl,
          cloudinaryPublicId: uploaded?.publicId,
          cloudinaryVersion: uploaded?.version ? String(uploaded.version) : undefined,
        },
        depth: 0,
        context: {
          skipCloudinarySync: true,
        },
      })

      mediaMap[key] = updated.id
      results.push(`Updated media: ${asset.fileName}`)
      continue
    }

    const uploaded = await uploadFileToCloudinary(asset.filePath, {
      folder: 'amazing-hauling',
      publicId: path.parse(asset.fileName).name,
      tags: ['amazing-hauling', 'seeded-media'],
    })
    const fileStats = await fs.stat(asset.filePath)

    const created = await payload.create({
      collection: 'media',
      data: {
        alt: asset.alt,
        caption: asset.caption,
        filename: asset.fileName,
        mimeType: asset.fileName.endsWith('.png') ? 'image/png' : 'image/jpeg',
        filesize: uploaded?.bytes || fileStats.size,
        width: uploaded?.width,
        height: uploaded?.height,
        url: uploaded?.secureUrl,
        thumbnailURL: uploaded?.secureUrl,
        cloudinaryPublicId: uploaded?.publicId,
        cloudinaryVersion: uploaded?.version ? String(uploaded.version) : undefined,
      },
      depth: 0,
      context: {
        skipCloudinarySync: true,
      },
    })

    mediaMap[key] = created.id
    results.push(`Created media: ${asset.fileName}`)
  }

  return mediaMap
}
