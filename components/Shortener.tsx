'use client';

import {useState} from 'react';
import createNewLink from "@/lib/createNewLink";
import Link from "next/link";
import { Button, TextField } from "@mui/material";
import validateLink from "@/lib/validateLink";

export default function Shorten() {
    const[originalUrl, setOriginalUrl] = useState<string>('');
    const[alias, setAlias] = useState<string>('');
    const[shortenUrl, setShortenUrl] = useState<string>('');
    const[error, setError] = useState<string>('');

    return (
        <>
            <form className="w-100"
                onSubmit={async(e) => {
                    e.preventDefault();

                    try {
                        const valid = await validateLink(originalUrl);
                        if (!valid) {
                            setError("URL must be a valid url");
                            return;
                        }

                        const result = await createNewLink(alias, originalUrl);
                        setShortenUrl(`${window.location.origin}/${result.alias}`);
                        setError('');
                    }
                    catch (e) {
                        console.error('Error:', e);
                        if (e instanceof Error) {
                            setError(e.message);
                        } else {
                            setError('An unexpected error occurred. Please try again.');
                        }
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

