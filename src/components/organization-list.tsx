"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Building2 } from "lucide-react";

// Mock list of organization names
const organizations = [
  "Acme Corporation",
  "Globex Corporation",
  "Soylent Corp",
  "Initech",
  "Umbrella Corporation",
  "Hooli",
  "Cyberdyne Systems",
  "Stark Industries",
  "Wayne Enterprises",
  "Oscorp Industries",
  "Weyland-Yutani Corporation",
  "Tyrell Corporation",
  "Wonka Industries",
  "Dunder Mifflin",
  "Pied Piper",
];

export default function OrganizationList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredOrganizations = mounted
    ? organizations.filter((org) =>
        org.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : organizations;

  if (!mounted) {
    return null; // or a loading spinner
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Organizations</h1>
      <Input
        type="text"
        placeholder="Search organizations..."
        className="mb-6"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredOrganizations.map((org) => (
          <Card
            key={org}
            className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg"
          >
            <CardContent className="p-4 flex items-center space-x-4">
              <Building2 className="h-6 w-6 text-primary" />
              <span className="font-medium">{org}</span>
            </CardContent>
          </Card>
        ))}
      </div>
      {mounted && filteredOrganizations.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          No organizations found.
        </p>
      )}
    </div>
  );
}
