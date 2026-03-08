import type { CollectionConfig } from 'payload'

export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  admin: {
    useAsTitle: 'companyName',
    defaultColumns: ['name', 'companyName', 'materialType', 'createdAt'],
  },
  access: {
    read: () => true,
    create: () => true,
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
