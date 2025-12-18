import { useState } from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link as UILink,
} from '@heroui/react'
import { Link, useLocation } from 'wouter'
import { cn } from '@/lib/utils'
import { ThemeSwitcher } from './theme-swticher'
import { MultilingualLogo } from '@/assets/Logo'
import { Icon } from '@iconify/react'

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [location] = useLocation()

  const navLinks = [
    { href: '/', label: 'Translator', icon: 'mdi:translate' },
    { href: '/writer', label: 'Writer', icon: 'mdi:pencil' },
    { href: '/chat', label: 'Chat', icon: 'mdi:chat' },
  ]

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="xl"
    >
      <NavbarContent>
        <NavbarBrand className="items-center" as={Link}>
          <MultilingualLogo className="text-primary mr-2 size-6" />
          <p className="font-bold text-inherit">Multilingüal</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end" className="hidden md:flex">
        {navLinks.map(({ href, label }) => (
          <NavbarItem key={href} isActive={location === href}>
            <UILink
              aria-current="page"
              href={href}
              as={Link}
              className={cn(
                location === href
                  ? 'text-primary font-semibold'
                  : 'text-foreground',
                'hover:text-primary transition-colors duration-200',
              )}
            >
              {label}
            </UILink>
          </NavbarItem>
        ))}

        <ThemeSwitcher />
      </NavbarContent>

      <NavbarContent justify="end" className="flex md:hidden">
        <ThemeSwitcher />
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        />
      </NavbarContent>

      <NavbarMenu>
        {navLinks.map(({ href, label, icon }) => (
          <NavbarMenuItem key={href} isActive={location === href}>
            <UILink
              className={cn(
                location === href
                  ? 'text-primary font-semibold'
                  : 'text-foreground',
                'bg-content2 hover:bg-content3 hover:text-primary flex w-full gap-4 rounded-md px-4 py-6 transition-colors duration-200',
              )}
              href={href}
              size="lg"
              as={Link}
              onPress={() => setIsMenuOpen(false)}
            >
              <span className="bg-content1/30 inline-flex h-12 w-12 items-center justify-center rounded-full">
                <Icon icon={icon} />
              </span>
              {label}
            </UILink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}
