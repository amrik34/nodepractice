import { useForm } from "@mantine/form";
import {
  Anchor,
  Button,
  Checkbox,
  Paper,
  Group,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import classes from "./auth.module.css";

const SignIn = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <>
      <div className={classes.wrapper}>
        <Paper className={classes.form} radius={0} p={30}>
          <Title
            order={2}
            className={classes.title}
            ta="center"
            mt="md"
            mb={50}
          >
            Welcome back to Mantine!
          </Title>

          <TextInput
            label="Email address"
            placeholder="hello@gmail.com"
            size="md"
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
          />
          <Checkbox label="Keep me logged in" mt="xl" size="md" />
          <Button fullWidth mt="xl" size="md">
            Login
          </Button>

          <Text ta="center" mt="md">
            Don&apos;t have an account?{" "}
            <Anchor<"a">
              href="#"
              fw={700}
              onClick={(event) => event.preventDefault()}
            >
              Register
            </Anchor>
          </Text>
        </Paper>
      </div>
    </>
  );
};

export default SignIn;
{
  /* <form onSubmit={form.onSubmit((values) => console.log(values))}>
  <TextInput
    withAsterisk
    label="Email"
    placeholder="your@email.com"
    key={form.key("email")}
    {...form.getInputProps("email")}
  />

  <Checkbox
    mt="md"
    label="I agree to sell my privacy"
    key={form.key("termsOfService")}
    {...form.getInputProps("termsOfService", { type: "checkbox" })}
  />

  <Group justify="flex-end" mt="md">
    <Button type="submit">Submit</Button>
  </Group>
</form>; */
}
