import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from '@heroui/react'
import { useTheme } from '@heroui/use-theme'
import { Icon } from '@iconify/react'

export const ThemeSwitcher = () => {
  const { setTheme } = useTheme()

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="light" isIconOnly>
          <Icon icon="lucide:moon" className="size-5" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="system" onClick={() => setTheme('system')}>
          System
        </DropdownItem>
        <DropdownItem key="light" onClick={() => setTheme('light')}>
          Light
        </DropdownItem>
        <DropdownItem key="dark" onClick={() => setTheme('dark')}>
          Dark
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
