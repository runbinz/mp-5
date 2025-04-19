'use client';

import {useState} from 'react';
import createNewLink from "@/app/lib/createNewLink";
import Link from "next/link";
import { Button, TextField } from "@mui/material";
import validateLink from "@/app/lib/validateLink";

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

                    createNewLink(originalUrl, alias)
                        .then((res) => {
                            setShortenUrl(`https://mp-5-gamma-three.vercel.app/${res.alias}`);
                            setError("");
                        })
                        .catch((e) => {
                            setError(e.message);
                            console.error(e);
                        });
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
                        <Link href={`/${alias}`} target="_blank">
                            {shortenUrl}
                        </Link>
                    </div>
                )}
            </form>
        </>
    )
}

