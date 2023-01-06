import Navigation from "../components/Navigation";
import { loginActionCreator } from "../states/auth/action";
import Wrapper from "./utils/Wrapper";

export default {
  title: "Navigation",
  component: Navigation,
};

const state = {
  id: "users-1",
  name: "John Doe",
  email: "john@example.com",
  avatar: "https://generated-image-url.jpg",
};

function WithoutAuth() {
  return (
    <Wrapper actions={[loginActionCreator(null)]}>
      <Navigation />
    </Wrapper>
  );
}

function WithAuth() {
  return (
    <Wrapper actions={[loginActionCreator(state)]}>
      <Navigation />
    </Wrapper>
  );
}

export { WithoutAuth, WithAuth };
