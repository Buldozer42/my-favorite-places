import { Button } from "../components/Button";
import { Form } from "../components/Form";
import { Input } from "../components/Input";
import { Layout } from "../components/Layout";
import { Row } from "../components/Row";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

type Address = {
  id: number;
  name: string;
  description?: string;
  lat: number;
  lng: number;
};

export function DashboardPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [searchResults, setSearchResults] = useState<Address[] | null>(null);

  async function fetchAddresses() {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You are not connected");
      return;
    }

    try {
      const { data } = await axios.get<{ items: Address[] }>("/api/addresses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAddresses(data.items || []);
    } catch {
      toast.error("Unable to load addresses");
    }
  }

  useEffect(() => {
    fetchAddresses();
  }, []);

  async function onCreateAddress(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You are not connected");
      return;
    }

    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      description: form.get("description"),
      searchWord: form.get("searchWord"),
    };

    try {
      await axios.post("/api/addresses", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      e.currentTarget.reset();
      toast.success("Address created");
      await fetchAddresses();
    } catch {
      toast.error("Unable to create address");
    }
  }

  async function onSearchAddresses(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You are not connected");
      return;
    }

    const form = new FormData(e.currentTarget);
    const radius = Number(form.get("radius"));
    const lat = Number(form.get("lat"));
    const lng = Number(form.get("lng"));

    if (Number.isNaN(radius) || Number.isNaN(lat) || Number.isNaN(lng)) {
      toast.error("Radius, lat and lng must be numbers");
      return;
    }

    try {
      const { data } = await axios.post<{ items: Address[] }>(
        "/api/addresses/searches",
        {
          radius,
          from: { lat, lng },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setSearchResults(data.items || []);
      toast.success("Search complete");
    } catch {
      toast.error("Unable to search addresses");
    }
  }

  function onSignout() {
    sessionStorage.clear();
    localStorage.clear();
    location.href = "/";
  }

  return (
    <Layout title="Dashboard page">
      <p>Welcome on your dashboard</p>

      <Form onSubmit={onCreateAddress}>
        <Input name="name" placeholder="Place name" />
        <Input name="description" placeholder="Description" />
        <Input name="searchWord" placeholder="Search word (address)" />
        <Button type="submit">Create address</Button>
      </Form>

      <Form onSubmit={onSearchAddresses}>
        <Input name="radius" type="number" placeholder="Radius (meters)" />
        <Input name="lat" type="number" step="any" placeholder="From lat" />
        <Input name="lng" type="number" step="any" placeholder="From lng" />
        <Button type="submit">Search in radius</Button>
      </Form>

      <p>Your addresses:</p>
      {addresses.map((address) => (
        <p key={address.id}>
          {address.name} ({address.lat}, {address.lng})
        </p>
      ))}

      {searchResults && <p>Search results:</p>}
      {searchResults?.map((address) => (
        <p key={`search-${address.id}`}>
          {address.name} ({address.lat}, {address.lng})
        </p>
      ))}

      <Row>
        <Button onClick={onSignout}>Signout</Button>
      </Row>
    </Layout>
  );
}
