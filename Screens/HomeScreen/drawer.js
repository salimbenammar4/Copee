import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SidebarScreen from './sidebarScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <SidebarScreen {...props} />}>
      <Drawer.Screen name="sidebarScreen" component={SidebarScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
