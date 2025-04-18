'use client';

import {useState} from 'react';
import createNewLink from "@/lib/createNewLink";
import Link from "next/link";
import { Button, TextField } from "@mui/material";
import validateLink from "@/lib/validateLink";

export default function Shorten() {
    const[originalUrl, setOriginalUrl] = useState("");
    const[alias, setAlias] = useState("");
    const[shortenUrl, setShortenUrl] = useState("");
    const[error, setError] = useState("");

    return (
        <>
            <form className="w-100"
                onSubmit={async(e) => {
                    e.preventDefault();

                    const valid = await validateLink(originalUrl);
                    if (!valid) {
                        setError("URL must be a valid url");
                        return;
                    }

                    try {
                        const res = await createNewLink(alias, originalUrl);
                        setShortenUrl(`${window.location.origin}/${res.alias}`);
                        setError("");
                    } catch (e) {
                        if (e instanceof Error) {
                            setError(e.message);
                        } else {
                            setError("An unknown error occurred");
                        }
                        console.error(e);
                    }
                }}>

                <TextField
                    label="URL"
                    type="url"
                    placeholder="https://www.example.com/longURL"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    required
                />
                <TextField
                    label="Custom Alias"
                    type="text"
                    placeholder="your-custom-alias"
                    value={alias}
                    onChange={(e) => setAlias(e.target.value)}
                    required
                />
                <Button
                    variant="contained"
                    type="submit"
                    disabled={originalUrl === "" || alias === "" }
                >
                    Shorten
                </Button>

                {error && <div>{error}</div>}
                {shortenUrl && (
                    <div>
                        <p>Shortened URL:</p>
                        <Link href={shortenUrl} target="_blank">
                            {shortenUrl}
                        </Link>
                    </div>
                )}
            </form>
        </>
    )
}

