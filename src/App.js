import Add from "./components/Add";
import Container from "./components/Container";
import Layout from "./components/Layout";
import ListOverview from "./components/ListOverview";
import { useAppContext } from "./Context/AppContext";

function App() {
  const { state } = useAppContext();

  return (
    <>
      <Layout>
        <Add />
        <Container>
          <ListOverview type="income" list={state.incomes} />
          <ListOverview type="expenses" list={state.expenses} />
        </Container>
      </Layout>
    </>
  );
}

export default App;
