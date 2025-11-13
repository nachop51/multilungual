import AppNavbar from '@/lib/components/common/app-navbar'
import { Route, Switch } from 'wouter'
import TranslatorPage from './pages'
import WriterPage from './pages/writer'
import ChatPage from './pages/chat'

export function App() {
  return (
    <>
      <AppNavbar />

      <Switch>
        <Route path="/" component={TranslatorPage} />
        <Route path="/writer" component={WriterPage} />
        <Route path="/chat" component={ChatPage} />

        <Route>Not found!</Route>
      </Switch>
    </>
  )
}

export default App

// Multilingual es una aplicacion de codigo abierto, que se encarga de traducir texto, ayudarte a reescribir, analizar y traducir documentos, y tambien cuenta con un chat interactivo para tener la oportunidad de dialogar con una inteligencia artificial experta en lenguajes.
// Multilingual is an open-source application that handles text translation, helps you rewrite, analyze, and translate documents, and also features an interactive chat for the opportunity to converse with an AI expert in languages.
// Multilingual li enn aplikasyon ki lib (open source), ki fer travay tradir lekri, ed to reekrir, analiz ek tradir dokiman, ek osi li ena enn chat interactiv pou gagn chans koz avek enn lentelijans artifice ki expert dan langaz.
