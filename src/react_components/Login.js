import React, { Component } from 'react'
import Particles from 'react-particles-js';
import { updateLoginForm, login, register, updateRegForm } from "../actions/user";
const log = console.log;

export default class Login extends Component {
    particlesOptions = {
        particles: {
            number: {
                value: 200
            }
        }
    };

    render() {
        return (
            <div id = 'consuming'>
                <Particles className="particles" params={this.particlesOptions}/>
                <div id='entry'>
                    <div id='register'>
                        <h1>Register</h1>
                        <form onSubmit={register}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Username</td>
                                        <td><input type="text" name="name"
                                            onChange={e => updateRegForm(e.target)}
                                        /></td>
                                    </tr>
                                    <tr>
                                        <td>Password</td>
                                        <td><input type="password" name="password"
                                        onChange={e => updateRegForm(e.target)}
                                        /></td>
                                    </tr>
                                    <tr>
                                        <td><input type="submit" value="Register"/></td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                    <div id='login'>
                        <h1>Log In</h1>
                        <form onSubmit={login}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Username</td>
                                        <td><input type="text" name="name"
                                            onChange={e => updateLoginForm(e.target)}
                                        /></td>
                                    </tr>
                                    <tr>
                                        <td>Password</td>
                                        <td><input type="password" name="password"
                                            onChange={e => updateLoginForm(e.target)}
                                        /></td>
                                    </tr>
                                    <tr>
                                        <td><input type="submit" value="Login"/></td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
        )

    }
}
