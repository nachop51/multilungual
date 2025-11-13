import React, { useState } from 'react'
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
import { Icon } from '@iconify/react'
import { cn } from '@/lib/utils'

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [location] = useLocation()

  const navLinks = [
    { href: '/', label: 'Translator' },
    { href: '/writer', label: 'Writer' },
    { href: '/chat', label: 'Multilingüal AI' },
  ]

  const menuItems = [
    'Profile',
    'Dashboard',
    'Activity',
    'Analytics',
    'System',
    'Deployments',
    'My Settings',
    'Team Settings',
    'Help & Feedback',
    'Log Out',
  ]

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarBrand className="items-center">
          <Icon icon="lucide:book-open" className="mr-2 size-6" />
          <p className="font-bold text-inherit">Multilingüal</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
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
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <UILink
              className="w-full"
              color={
                index === 2
                  ? 'primary'
                  : index === menuItems.length - 1
                    ? 'danger'
                    : 'foreground'
              }
              href="#"
              size="lg"
              as={Link}
            >
              {item}
            </UILink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}
