import { TestScheduler } from 'jest';
import React from 'react';
import 'react-native';
import {create} from 'react-test-renderer';
//import LoginScreen from '../src/Screens/Login/LoginScreen';
import ForgotPasswordScreen from '../src/Screens/Login/ForgotPasswordScreen';
import EmailVerificationScreen from '../src/Screens/Login/EmailVerificationScreen';

//const login = create(<LoginScreen/>);
const forgot = create(<ForgotPasswordScreen/>);
const email = create(<EmailVerificationScreen/>);
console.log(forgot.toJSON());
/*
it('snapshot', () => [
    
    expect(login).toMatchSnapshot()
]); */

it('snapshot', () => [
    expect(forgot).toMatchSnapshot()
]);

it('snapshot', () => [
    expect(email).toMatchSnapshot()
]);