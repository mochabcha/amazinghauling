import React from 'react'
import { Heading } from '../atoms/Heading'
import { Badge } from '../atoms/Badge'
import { Text } from '../atoms/Text'

export interface AdditionalAreasProps {
  areas: string[]
  note?: string
  className?: string
}

export const AdditionalAreas: React.FC<AdditionalAreasProps> = ({
  areas,
  note = 'For long-term or large-scale projects, we are able to travel beyond our core region when scheduling and logistics allow.',
  className = '',
}) => {
  const classes = ['service-areas-list__additional', className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      <Heading level={4} className="mb-4">Additional Areas We Serve</Heading>
      <div className="flex flex-wrap gap-3">
        {areas.map((area, index) => (
          <Badge key={index} variant="navy">{area}</Badge>
        ))}
      </div>
      {note && <Text size="base" className="mt-4">{note}</Text>}
    </div>
  )
}
