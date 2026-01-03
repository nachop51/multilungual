import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Link as UILink,
} from '@heroui/react'
import { Icon } from '@iconify/react'
import { useState } from 'react'
import { Link, useLocation } from 'wouter'
import { MultilingualLogo } from '@/assets/Logo'
import { cn } from '@/lib/utils/fns'
import { paths } from '@/lib/utils/paths'
import { ThemeSwitcher } from './theme-swticher'

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [location] = useLocation()

  const navLinks = [
    { href: paths.translator(), label: 'Translator', icon: 'mdi:translate' },
    { href: paths.writer(), label: 'Writer', icon: 'mdi:pencil' },
    { href: paths.chat(), label: 'Chat', icon: 'mdi:chat' },
  ]

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="xl"
    >
      <NavbarContent>
        <NavbarBrand className="items-center" as={Link} href={paths.home()}>
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
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-content1/30">
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
