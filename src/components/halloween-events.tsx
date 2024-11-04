'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MenuIcon, MapPin, Users, Ticket, Flame, Search, Plus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"

export function HalloweenEvents() {
  const [mounted, setMounted] = useState(false)
  const [currentDate, setCurrentDate] = useState<Date | undefined>(undefined)

  useEffect(() => {
    setMounted(true)
    setCurrentDate(new Date())
  }, [])

  // Render a placeholder until the component has mounted
  if (!mounted) {
    return <div className="min-h-screen bg-background"></div>
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Menu</span>
            </Button>
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/placeholder.svg"
                alt="Pinnit Logo"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="font-bold text-xl">PINNIT</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <form className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search events..."
                className="pl-8 w-[200px] lg:w-[300px]"
              />
            </form>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" /> Add Event
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-6">
        <div className="grid gap-6 lg:grid-cols-[1fr,300px]">
          <div>
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold">
                      {currentDate ? currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : 'Loading...'}
                    </h2>
                    <p className="text-muted-foreground">26 Events today</p>
                  </div>
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                    View Halloween Events
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Upcoming Events</h3>
                <Button variant="outline">Filter ▼</Button>
              </div>
              {[1, 2, 3].map((_, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all">
                  <CardHeader className="flex flex-row gap-4 items-start">
                    <Image
                      src="/placeholder.svg"
                      alt="Event thumbnail"
                      width={120}
                      height={120}
                      className="rounded-lg object-cover"
                    />
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">from now</div>
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                        Halloween House Party: The Last Shred Edition
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          Surf House
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          UBC Surf & Blank Vinyl Project
                        </div>
                        <div className="flex items-center gap-1">
                          <Ticket className="h-4 w-4" />
                          Ticketed
                        </div>
                      </div>
                      <Button variant="secondary" size="sm">
                        Social
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Search by date</h3>
              </CardHeader>
              <CardContent>
        
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="font-semibold">Featured Event</h3>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-orange-600">
                  <Flame className="h-5 w-5" />
                  <div className="font-semibold">(19+) The Pit of Nightmares</div>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Don't miss out on the scariest event of the night!
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="font-semibold">Event Map</h3>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Map placeholder</p>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>

      <footer className="border-t mt-12">
        <div className="container py-6 text-center text-sm text-muted-foreground">
          <Link href="#" className="hover:underline">
            Subscribe to our newsletter
          </Link>
          {" • "}
          <Link href="#" className="hover:underline">
            Terms of Service
          </Link>
          {" • "}
          <Link href="#" className="hover:underline">
            Privacy Policy
          </Link>
        </div>
      </footer>
    </div>
  )
}