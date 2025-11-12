import AppNavbar from '@/components/common/app-navbar'
import { Route, Switch } from 'wouter'
import TranslatorPage from './pages'
import WriterPage from './pages/writer'

export function App() {
  return (
    <>
      <AppNavbar />

      <Switch>
        <Route path="/" component={TranslatorPage} />
        <Route path="/writer" component={WriterPage} />

        <Route>Not found!</Route>
      </Switch>
    </>
  )
}

export default App
