import { Route, Switch } from 'wouter'
import { paths } from './lib/utils/paths'
import AppNavbar from './lib/components/common/app-navbar'
import TranslatorPage from './pages'
import { lazy, Suspense } from 'react'

const WriterPage = lazy(() => import('./pages/writer'))
const ChatPage = lazy(() => import('./pages/chat'))

function App() {
  return (
    <>
      <AppNavbar />

      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path={paths.translator()} component={TranslatorPage} />
          <Route path={paths.writer()} component={WriterPage} />
          <Route path={paths.chat()} component={ChatPage} />

          <Route>Not found!</Route>
        </Switch>
      </Suspense>
    </>
  )
}

export default App
