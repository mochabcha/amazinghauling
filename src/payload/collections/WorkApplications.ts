import type { CollectionConfig } from 'payload'

export const WorkApplications: CollectionConfig = {
  slug: 'work-applications',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'applicationType', 'email', 'status', 'createdAt'],
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => false,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'applicationType',
      type: 'select',
      required: true,
      options: [
        { label: 'Company Driver', value: 'company-driver' },
        { label: 'Owner-Operator / Lease-On', value: 'owner-operator' },
      ],
    },
    {
      name: 'fullName',
      type: 'text',
      required: true,
      label: 'Full Name',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'cityState',
      type: 'text',
      required: true,
      label: 'City / State',
    },
    {
      name: 'cdlClass',
      type: 'select',
      required: true,
      label: 'CDL Class',
      options: [
        { label: 'Class A', value: 'class-a' },
        { label: 'Class B', value: 'class-b' },
        { label: 'Permit / In Progress', value: 'permit' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'yearsExperience',
      type: 'number',
      required: true,
      label: 'Years of Experience',
      min: 0,
      max: 60,
    },
    {
      name: 'availableDate',
      type: 'date',
      required: true,
      label: 'Available Start Date',
    },
    {
      name: 'currentEmployer',
      type: 'text',
      label: 'Current Employer',
    },
    {
      name: 'endorsements',
      type: 'text',
      label: 'Endorsements',
    },
    {
      name: 'truckCount',
      type: 'number',
      label: 'Number of Trucks',
      min: 0,
      max: 50,
    },
    {
      name: 'truckDescription',
      type: 'textarea',
      label: 'Truck Details',
    },
    {
      name: 'haulingExperience',
      type: 'textarea',
      required: true,
      label: 'Hauling / Work Experience',
    },
    {
      name: 'additionalInfo',
      type: 'textarea',
      label: 'Additional Information',
    },
    {
      name: 'consent',
      type: 'checkbox',
      required: true,
      defaultValue: false,
      label: 'Applicant Consent',
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
      admin: {
        position: 'sidebar',
      },
      options: [
        { label: 'New', value: 'new' },
        { label: 'Reviewing', value: 'reviewing' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Closed', value: 'closed' },
      ],
    },
  ],
}
