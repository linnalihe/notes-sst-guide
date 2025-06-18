import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import { useNavigate } from "react-router-dom";
import { useFormFields } from "../lib/hooksLib";
import { useAppContext } from "../lib/contextLib";
import LoaderButton from "../components/LoaderButton";
import "./Signup.css"
import { showError } from "../lib/errorLib";
import { Auth } from "aws-amplify";
import type {ISignUpResult } from "amazon-cognito-identity-js"

export default function Signup() {
    const [ fields, setFields ] = useFormFields({
        email: "",
        password: "",
        confirmPassword: "",
        confirmationCode: "",
    });
    const nav = useNavigate();
    const { setIsAuthenticated } = useAppContext()
    const [ isLoading, setIsLoading ] = useState(false)
    const [ newUser, setNewUser ] = useState<null | ISignUpResult>(null);

    function validateForm() {
        return (
            fields.email.length > 0 &&
            fields.password.length > 0 &&
            fields.password === fields.confirmPassword
        )
    }
    function validateConfirmationForm() {
        return fields.confirmationCode.length > 0;
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        try {
            const newUser = await Auth.signUp({
                username: fields.email,
                password: fields.password,
            });
            setIsLoading(false);
            setNewUser(newUser);
        } catch (e) {
            showError(e)
            setIsLoading(false);
        }
        setIsLoading(false);
    }

    async function handleConfirmationSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();
        setIsLoading(true);
        try {
            await Auth.confirmSignUp(fields.email, fields.confirmationCode);
            await Auth.signIn(fields.email, fields.password);
            setIsAuthenticated(true)
            nav("/");
        } catch (e) {
            showError(e);
            setIsLoading(false)
        }
    }

    function renderConfirmationForm() {
        return (
            <Form onSubmit={handleConfirmationSubmit}>
                <Stack gap={3}>
                    <Form.Group controlId="confirmationCode">
                        <Form.Label>Confirmation Code</Form.Label>
                        <Form.Control
                        size="lg"
                        autoFocus
                        type="tel"
                        onChange={setFields}
                        value={fields.confirmationCode} />
                    <Form.Text muted>Please check your email for the code</Form.Text>
                    </Form.Group>
                    <LoaderButton
                    size="lg"
                    type="submit"
                    variant="success"
                    isLoading={isLoading}
                    disabled={!validateConfirmationForm()}
                    >
                        Verify
                    </LoaderButton>
                </Stack>
            </Form>
        )
    }

    function renderForm(){
        return(
            <Form onSubmit={handleSubmit}>
                <Stack gap={3}>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                        size="lg"
                        autoFocus
                        type="email"
                        value={fields.email}
                        onChange={setFields} />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                        size="lg"
                        autoFocus
                        type="password"
                        value={fields.password}
                        onChange={setFields} />
                    </Form.Group>

                    <Form.Group controlId="confirmPassword">
                        <Form.Label>confirmPassword</Form.Label>
                        <Form.Control
                        size="lg"
                        autoFocus
                        type="password"
                        value={fields.confirmPassword}
                        onChange={setFields} />
                    </Form.Group>
                    <LoaderButton
                    size="lg"
                    type="submit"
                    variant="success"
                    isLoading={isLoading}
                    disabled={!validateForm()}
                    >
                        Signup
                    </LoaderButton>
                </Stack>
            </Form>
        )
    }

    return (
        <div className="Signup">
            {newUser === null ? renderForm() : renderConfirmationForm()}
        </div>
    )
}