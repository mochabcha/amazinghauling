import type { CollectionConfig } from 'payload'

export const SubcontractorApplications: CollectionConfig = {
  slug: 'subcontractor-applications',
  admin: {
    useAsTitle: 'companyName',
    defaultColumns: ['companyName', 'contactName', 'status', 'createdAt'],
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'contactName',
      type: 'text',
      required: true,
      label: 'Contact Name',
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
      name: 'cdlNumber',
      type: 'text',
      label: 'CDL Number',
    },
    {
      name: 'numberOfTrucks',
      type: 'number',
      label: 'Number of Trucks',
    },
    {
      name: 'truckTypes',
      type: 'text',
      label: 'Truck Types',
    },
    {
      name: 'insuranceProvider',
      type: 'text',
      label: 'Insurance Provider',
    },
    {
      name: 'experienceYears',
      type: 'number',
      label: 'Years of Experience',
    },
    {
      name: 'serviceAreas',
      type: 'text',
      label: 'Service Areas',
    },
    {
      name: 'additionalInfo',
      type: 'textarea',
      label: 'Additional Information',
    },
    {
      name: 'documents',
      type: 'array',
      label: 'Uploaded Documents',
      fields: [
        {
          name: 'document',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      admin: { position: 'sidebar' },
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Reviewed', value: 'reviewed' },
        { label: 'Approved', value: 'approved' },
        { label: 'Declined', value: 'declined' },
      ],
    },
  ],
}
