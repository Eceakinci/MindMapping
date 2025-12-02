"use client";
import data from '../data/data.json'

export default function Page() {
    return (
        <div>
            {data.data.map(({ article, word, example }) => (
                <p key={word}>
                    <strong>{article} {word}</strong> – {example}
                </p>
            ))}
        </div>
    )
}