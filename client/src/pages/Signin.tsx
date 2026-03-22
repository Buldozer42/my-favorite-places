import { Button } from "../components/Button";
import { Form } from "../components/Form";
import { Input } from "../components/Input";
import { Layout } from "../components/Layout";
import axios from "axios";
import { toast } from "react-hot-toast";

export function SigninPage() {
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const json = { email: form.get("email"), password: form.get("password") };
    let data: { token: string } | undefined;

    try {
      const response = await axios.post<{ token: string }>("/api/users/tokens", json);
      data = response.data;
    } catch {
      toast.error("Unable to sign in");
      return;
    }

    if (data?.token) {
      const meResult = await axios.get("/api/users/me", {
        headers: { Authorization: `Bearer ${data.token}` },
      });

      if (meResult.data?.item?.id) {
        localStorage.setItem("token", data?.token);
        sessionStorage.setItem("user", JSON.stringify(meResult.data.item));
        toast.success("You are connected");
        location.href = "/dashboard";
      } else {
        toast.error("Unable to sign in");
      }
    } else {
      toast.error("Unable to sign in");
    }
  }

  return (
    <Layout title="Home page">
      <p>Sign in on the App</p>
      <Form onSubmit={onSubmit}>
        <Input name="email" type="email" placeholder="User email" />
        <Input name="password" type="password" placeholder="Password" />
        <Button type="submit">Signin</Button>
      </Form>
    </Layout>
  );
}
