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
import { Link } from "react-router-dom";

const SignUp = () => {
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
            Welcome back
          </Title>

          <TextInput label="UserName" placeholder="name" size="md" />
          <TextInput label="Mobile" placeholder="mobile" size="md" mt="md" />
          <TextInput
            label="Email address"
            placeholder="hello@gmail.com"
            size="md"
            mt="md"
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
          />
          <Checkbox label="Keep me logged in" mt="xl" size="md" />
          <Button fullWidth mt="xl" size="md">
            Sign Up
          </Button>

          <Text ta="center" mt="md">
            Already have an account?{" "}
            <Link to="/signin" className="hover:text-blue-600 text-blue-500">
              Sign In
            </Link>
          </Text>
        </Paper>
      </div>
    </>
  );
};

export default SignUp;
