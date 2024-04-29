import './App.css';
import { React } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthContextProvider } from './auth';
import { GlobalStoreContextProvider } from './store'
import {
  LoginScreen,
  AboutScreen,
  SettingsScreen,
  SocialScreen,
  ForumScreen,
  MapSearchScreen,
  MapBuilderScreen,
  ProfileScreen,
  GameScreen,
  PostScreen,
  NewThreadScreen,
  LeaderboardScreen,
  ReportsScreen,
  RegisterScreen,
} from './components'
import HomeWrapper from './components/HomeWrapper';
import ErrorHandler from './components/ErrorHandler';

/*
    This is our application's top-level component.
    
    @author McKilla Gorilla
*/
/*
  This is the entry-point for our application. Notice that we
  inject our store into all the components in our application.
  
  @author McKilla Gorilla
*/

// Styling
export const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  boxShadow: 24,
  p: 3
};
export const buttonStyle = {
  bgcolor: '#3A9158',
  ":hover": {
    bgcolor: '#2d7044'},
}

const App = () => {
    return (
        <BrowserRouter>
              <AuthContextProvider>
                  <GlobalStoreContextProvider>
                      <ErrorHandler>
                          <Routes>
                            <Route path="/" exact element={<HomeWrapper />} />
                            <Route path="/login/" exact element={<LoginScreen />} />
                            <Route path="/register/" exact element={<RegisterScreen />} />
                            <Route path="/about/" exact element={<AboutScreen />} />
                            <Route path="/settings/" exact element={<SettingsScreen />} />
                            <Route path="/social/" exact element={<SocialScreen />} />
                            <Route path="/forum/" exact element={<ForumScreen />} />
                            <Route path="/mapsearch/" exact element={<MapSearchScreen />} />
                            <Route path="/mapbuilder/" exact element={<MapBuilderScreen />} />
                            <Route path="/profile/" exact element={<ProfileScreen />} />
                            <Route path="/game/" exact element={<GameScreen />} />
                            <Route path="/post/" exact element={<PostScreen />} />
                            <Route path="/newthread/" exact element={<NewThreadScreen />} />
                            <Route path="/leaderboard/" exact element={<LeaderboardScreen />} />
                            <Route path="/reports/" exact element={<ReportsScreen />} />
                        </Routes>
                      </ErrorHandler>
                  </GlobalStoreContextProvider>
              </AuthContextProvider>
        </BrowserRouter>
    )
}

export default App