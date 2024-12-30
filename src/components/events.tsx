'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MenuIcon, MapPin, Users, Ticket, Flame, Search, Plus } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface Event {
  id: string;
  event_date: string;
  event_title: string;
  host_organization: string;
  start_time: string;
  end_time: string;
  location: string;
  activity_description: string;
  registration_status: string;
  reference_link: string;
  image_url: string;
  latitude?: number;
  longitude?: number;
  tags: string[];
  faculty: string[];
  degree_level: string[];
}

export function Events() {
  const [mounted, setMounted] = useState(false);
  const [currentDate, setCurrentDate] = useState<Date | undefined>(undefined);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    setMounted(true);
    setCurrentDate(new Date());

    // Fetch events from the backend
    async function fetchEvents() {
      try {
        const response = await fetch('/api/events');
        const data: Event[] = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    }

    fetchEvents();
  }, []);

  // Render a placeholder until the component has mounted
  if (!mounted) {
    return <div className="min-h-screen bg-background"></div>;
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
                src="/pinnit_logo.svg"
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
                      {currentDate
                        ? currentDate.toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric',
                          })
                        : 'Loading...'}
                    </h2>
                    <p className="text-muted-foreground">
                      {events.length} Events today
                    </p>
                  </div>
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                    View Events
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Upcoming Events</h3>
                <Button variant="outline">Filter ▼</Button>
              </div>
              {events.length ? (
                events.map((event, index) => (
                  <Card key={event.id || index} className="group hover:shadow-lg transition-all">
                    <CardHeader className="flex flex-row gap-4 items-start">
                      <Image
                        src={event.image_url || '/placeholder.svg'}
                        alt={event.event_title}
                        width={120}
                        height={120}
                        className="rounded-lg object-cover"
                      />
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">{event.start_time}</div>
                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                          {event.event_title}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {event.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {event.host_organization}
                          </div>
                          <div className="flex items-center gap-1">
                            <Ticket className="h-4 w-4" />
                            {event.registration_status}
                          </div>
                        </div>
                        <Button variant="secondary" size="sm">
                          {event.tags.join(', ')}
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                ))
              ) : (
                <p>No events available</p>
              )}
            </div>
          </div>

          <aside className="space-y-6">
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Search by date</h3>
              </CardHeader>
              <CardContent></CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="font-semibold">Featured Event</h3>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-orange-600">
                  <Flame className="h-5 w-5" />
                  <div className="font-semibold">Featured Event</div>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Don&apos;t miss out on exciting events!
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
          {' • '}
          <Link href="#" className="hover:underline">
            Terms of Service
          </Link>
          {' • '}
          <Link href="#" className="hover:underline">
            Privacy Policy
          </Link>
        </div>
      </footer>
    </div>
  );
}
