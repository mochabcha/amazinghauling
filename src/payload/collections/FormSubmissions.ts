import type { CollectionConfig } from 'payload'

export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'companyName', 'materialType', 'emailDeliveryStatus', 'createdAt'],
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => false,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'companyName',
      type: 'text',
      label: 'Company Name',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'projectLocation',
      type: 'text',
      label: 'Project Location',
    },
    {
      name: 'materialType',
      type: 'select',
      label: 'Type of Material',
      options: [
        { label: 'Dirt / Fill', value: 'dirt-fill' },
        { label: 'Asphalt', value: 'asphalt' },
        { label: 'Rock / Aggregates', value: 'rock-aggregates' },
        { label: 'Milling Debris', value: 'milling-debris' },
        { label: 'Construction Materials', value: 'construction-materials' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'startDate',
      type: 'text',
      label: 'Estimated Start Date',
    },
    {
      name: 'duration',
      type: 'text',
      label: 'Estimated Duration',
    },
    {
      name: 'trucksNeeded',
      type: 'text',
      label: 'Number of Trucks Needed',
    },
    {
      name: 'additionalDetails',
      type: 'textarea',
      label: 'Additional Details',
    },
    {
      name: 'sourcePage',
      type: 'text',
      label: 'Source Page',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'ipAddress',
      type: 'text',
      label: 'IP Address',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'userAgent',
      type: 'textarea',
      label: 'User Agent',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'emailDeliveryStatus',
      type: 'select',
      defaultValue: 'pending',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Sent', value: 'sent' },
        { label: 'Failed', value: 'failed' },
      ],
    },
    {
      name: 'emailDeliveredAt',
      type: 'date',
      label: 'Email Delivered At',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'emailDeliveryError',
      type: 'textarea',
      label: 'Email Delivery Error',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      admin: { position: 'sidebar' },
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Quoted', value: 'quoted' },
        { label: 'Closed', value: 'closed' },
      ],
    },
  ],
}
