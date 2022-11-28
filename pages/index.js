import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

const Home = () => {
        const [authorInput, setauthorInput] = useState('');
        const [promptInput, setpromptInput] = useState('');
        const [apiOutput, setApiOutput] = useState('')
        const [isGenerating, setIsGenerating] = useState(false)

        const callGenerateEndpoint = async () => {
            setIsGenerating(true);

            console.log("Calling OpenAI...")
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ authorInput, promptInput })
            });

            const data = await response.json();
            const { output } = data;
            console.log("OpenAI replied...", output.text)

            setApiOutput(`${output.text}`);
            setIsGenerating(false);
        }
        const onauthorChangedText = (event) => {
            setauthorInput(event.target.value);
        };
        const onpromptChangedText = (event) => {
            setpromptInput(event.target.value);
        };
        return (
                <div className="root">
      <Head>
        <title>GPT-3 Writer | buildspace</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>AI Muse</h1>
          </div>
          <div className="header-subtitle">
            <h2>Give an authors name and a prompt and AI Muse will generate a poem based on the prompt in the authors voice</h2>
          </div>
        </div>

        {/* AI Muse Author Box*/}
        <div className="author-container">
        <textarea placeholder="Type in authors name" className="author-box"
        value={authorInput}
        onChange={onauthorChangedText}
        />

        {/* AI Muse Prompt Box */}
        <div className="prompt-container">
          <textarea placeholder="What do you want the poem to be about" className="prompt-box" 
          value={promptInput}
          onChange={onpromptChangedText}
        />

    <div className="prompt-buttons">
    <a className="generate-button" onClick={callGenerateEndpoint}>
      <div className="generate">
        <p>Generate</p>
      </div>
     
    </a>
    <div className="prompt-buttons">
  <a
    className={isGenerating ? 'generate-button loading' : 'generate-button'}
    onClick={callGenerateEndpoint}
  >
    <div className="generate">
    {isGenerating ? <span class="loader"></span> : <p>Generate</p>}
    </div>
  </a>
</div>
</div>
  </div>
  {/* AI Muse Output */}
  {apiOutput && (
  <div className="output">
    <div className="output-header-container">
      <div className="output-header">
        <h3>Output</h3>
      </div>
    </div>
    <div className="output-content">
      <p>{apiOutput}</p>
    </div>
  </div>
)}

        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
    );
};

export default Home;