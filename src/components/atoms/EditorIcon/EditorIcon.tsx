import {
  ImageIcon,
  LogOut,
  Plus,
  Save,
  Upload,
  X,
  type LucideIcon,
} from 'lucide-react'

export type EditorIconName = 'close' | 'exit' | 'image' | 'plus' | 'save' | 'upload'

interface EditorIconProps {
  className?: string
  name: EditorIconName
}

const icons: Record<EditorIconName, LucideIcon> = {
  close: X,
  exit: LogOut,
  image: ImageIcon,
  plus: Plus,
  save: Save,
  upload: Upload,
}

export function EditorIcon({ className, name }: EditorIconProps) {
  const Icon = icons[name]
  return <Icon aria-hidden="true" className={className} size={16} strokeWidth={1.8} />
}
