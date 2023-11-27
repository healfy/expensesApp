import {StatusBar} from 'expo-status-bar';
import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import {NavigationContainer} from "@react-navigation/native";
import ManageExpensesScreen from "./screens/ManageExpenses";
import RecentExpensesScreen from "./screens/RecentExpenses";
import AllExpensesScreen from "./screens/AllExpenses";
import {Ionicons} from "@expo/vector-icons";
import {GlobalStyles} from "./consts/styles";
import IconButton from "./components/AddButton";
import ExpensesProvider from "./store/expenses-context";


const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const ExpensesOverview = (): React.JSX.Element => {
    return (
        <BottomTabs.Navigator screenOptions={({navigation}) => ({
            headerStyle: {
                backgroundColor: GlobalStyles.colors.primary500
            },
            headerTintColor: GlobalStyles.colors.accent500,
            tabBarStyle: {
                backgroundColor: GlobalStyles.colors.primary500
            },
            tabBarActiveTintColor: GlobalStyles.colors.accent500,
            headerRight: ({tintColor}) => {
                const color = tintColor ? tintColor : GlobalStyles.colors.accent500
                return <IconButton name={"add"} color={color} size={30} onPress={() => {
                    navigation.navigate("ManageExpenses")
                }}/>
            }
        })}>
            <BottomTabs.Screen name={"RecentExpenses"} component={RecentExpensesScreen} options={{
                tabBarIcon: ({color, size}) => (
                    <Ionicons name="wallet-outline" color={color} size={size}/>),
                title: "Recent Expenses",
                tabBarLabel: "Recent"
            }}/>
            <BottomTabs.Screen name={"AllExpenses"} component={AllExpensesScreen} options={{
                tabBarIcon: ({color, size}) => (<Ionicons name="reader-outline" color={color} size={size}/>),
                title: "All Expenses",
                tabBarLabel: "All Expenses"
            }}/>
        </BottomTabs.Navigator>
    )
}

export default function App(): React.JSX.Element {
    return (
        <>
            <StatusBar style="light"/>
            <ExpensesProvider>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{
                        headerStyle: {
                            backgroundColor: GlobalStyles.colors.primary500
                        },
                        headerTintColor: GlobalStyles.colors.accent500,
                    }}>
                        <Stack.Screen name={"ExpensesOverview"} component={ExpensesOverview}
                                      options={{headerShown: false}}/>
                        <Stack.Screen name={"ManageExpenses"} component={ManageExpensesScreen} options={{
                            presentation: "modal"
                        }}/>
                    </Stack.Navigator>

                </NavigationContainer>
            </ExpensesProvider>
        </>
    );
}

