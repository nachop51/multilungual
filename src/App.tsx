import AppNavbar from '@/lib/components/common/app-navbar'
import { Route, Switch } from 'wouter'
import TranslatorPage from './pages'
import WriterPage from './pages/writer'
import ChatPage from './pages/chat'
import { paths } from './lib/utils/paths'

export function App() {
  return (
    <>
      <AppNavbar />

      <Switch>
        <Route path={paths.translator()} component={TranslatorPage} />
        <Route path={paths.writer()} component={WriterPage} />
        <Route path={paths.chat()} component={ChatPage} />

        <Route>Not found!</Route>
      </Switch>
    </>
  )
}

export default App
