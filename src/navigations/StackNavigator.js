import React from 'react';
import Splash from '../screens/Splash';
import Login from '../screens/Login/Login';
import Otp from '../screens/Otp/Otp';
import Register from '../screens/Register/Register';
import LocationSearch from '../screens/LocationSearch';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home/Home';
import FreeInsights from '../screens/FreeInsights';
import MatchMaking from '../screens/Kundli/MatchMaking';
import FreeKundli from '../screens/Kundli/FreeKundli';
import Panchang from '../screens/Kundli/Panchang';
import MatchingReport from '../screens/Kundli/MatchingReport';
import MatchCategory from '../screens/Panchang/MatchCatagory';
import MatchBirthDetail from '../screens/Panchang/MatchBirthDetail';
import MatchHoroscopeChart from '../screens/Panchang/MatchHoroscopeChart';
import MatchAshtakoota from '../screens/Panchang/MatchAshtakoota';
import MatchDashakoota from '../screens/Panchang/MatchDashakoota';
import ManglikMatch from '../screens/Panchang/ManglikMatch';
import MatchConclusion from '../screens/Panchang/MatchConclusion';
import KundliList from '../screens/Kundli/KundliList';
import KundliCategory from '../screens/Kundli/KundliCategory';
import BirthDetails from '../screens/Kundli/BirthDetails';
import HoroscopeChart from '../screens/Kundli/HoroscopeChart';
import PlanetaryDetails from '../screens/Kundli/PlanetaryDetails';
import KPChart from '../screens/Kundli/KPChart';
import KundliDosh from '../screens/Kundli/KundliDosh';
import VimshottariDasha from '../screens/Kundli/VimshottariDasha';
import KundliReport from '../screens/Kundli/KundliReport';
import Favourable from '../screens/Kundli/Favourable';
import KundliRemedies from '../screens/Kundli/KundliRemedies';
import MatchingKundliList from '../screens/Kundli/MatchingKundliList';


const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="splash"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="splash" component={Splash} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="otp" component={Otp} />
      <Stack.Screen name="register" component={Register} />
      <Stack.Screen name="locationSearch" component={LocationSearch} />
      <Stack.Screen name="freeInsights" component={FreeInsights} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="matchMaking" component={MatchMaking} />
      <Stack.Screen name="freeKundli" component={FreeKundli} />
      <Stack.Screen name="panchang" component={Panchang} />
      <Stack.Screen name="matchingReport" component={MatchingReport} />
      <Stack.Screen name="matchCategory" component={MatchCategory} />

      <Stack.Screen name="matchBirthDetail" component={MatchBirthDetail} />
      <Stack.Screen name="matchHoroscopeChart" component={MatchHoroscopeChart} />
      <Stack.Screen name="matchAshtakoota" component={MatchAshtakoota} />
      <Stack.Screen name="matchDashakoota" component={MatchDashakoota} />
      <Stack.Screen name="manglikMatch" component={ManglikMatch} />
      <Stack.Screen name="matchConclusion" component={MatchConclusion} />
      <Stack.Screen name="kundliList" component={KundliList} />
      <Stack.Screen name="kundliCategory" component={KundliCategory} />

      <Stack.Screen name="planetaryDetails" component={PlanetaryDetails} />
      <Stack.Screen name="horoscopeChart" component={HoroscopeChart} />

      <Stack.Screen name="kpChart" component={KPChart} />
      <Stack.Screen name="kundliDosh" component={KundliDosh} />
      <Stack.Screen name="vimshottariDasha" component={VimshottariDasha} />
      <Stack.Screen name="kundlireport" component={KundliReport} />
      <Stack.Screen name="favourable" component={Favourable} />
      <Stack.Screen name="kundliRemedies" component={KundliRemedies} />
      <Stack.Screen name="birthDetails" component={BirthDetails} />
      <Stack.Screen name= "MatchingKundliList" component={MatchingKundliList} />

    </Stack.Navigator>
  );
};

export default StackNavigator;
