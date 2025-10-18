import React, { useEffect, useState } from 'react'
import { Button, FormField } from '../../../components'
import AsyncSelect from 'react-select/async'
import { searchSkills } from '../../../controllers/skills'
import { shareProject } from '../../../controllers/projects'

const AddProject = () => {

    const [formData, setFormData] = useState({
        title: '',
        stage: 'idea',
        tagline: '',
        description: '',
        skills: [],
        github_url: ''
    })
    const [loading, setLoading] = useState(false)
    const [aiGenerating, setAiGenerating] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const [suggestedSkills, setSuggestedSkills] = useState([])
    const [loadingSuggestions, setLoadingSuggessions] = useState(false)


    const loadOptions = async (inputValue) => {
        return await searchSkills(inputValue);
    }

    const handleAddProject = async (e) => {
        e.preventDefault();
        console.log(formData);        
        setLoading(true)
        try {
            await shareProject(formData)
            setSuccess("Project Shared")        
        } catch (error) {
            console.error(error.response.data.msg)
            setError(error.response.data.msg)
        }finally{
            setLoading(false)
        }
    }


    const handleDescriptionGenerate = async () => {

        try {

            setAiGenerating(true)

            if (!window.puter || !window.puter.ai || typeof window.puter.ai.chat !== "function") {
                setAiGenerating(false)
                alert("Puter AI not loaded");
                return;
            }

            if(formData.title == '' || formData.tagline == ''){
                setAiGenerating(false)
                alert("Enter Title and Tagline before generating")
                return;
            }

           
            const prompt = `
                You are an experienced startup copywriter specializing in developer-focused platforms.
                Your task: write a concise, consistent, and human-sounding project description
                for a collaboration platform where developers share projects and attract teammates.

                Follow these exact rules:
                1. Style: natural, friendly, slightly enthusiastic (no marketing buzzwords).
                2. Tone: confident but conversational — think "dev posting on a project board".
                3. Length: 50–80 words, one short paragraph only.
                4. Focus: describe what the project does, its goal, and what help is needed.
                5. Formatting: plain text only — no bold, markdown, or headings.
                6. Bullet points allowed only if describing features or roles needed.
                7. Avoid generic intros like "This project is about" or "Our project aims to".

                Project data:
                - Title: ${formData.title}
                - Tagline: ${formData.tagline}
                - User inputed Description (one you're replacing with) : ${formData.description}
                - Project working stage: ${formData.stage}

                Return ONLY the final description — no commentary or labels.
                `;



            const response = await window.puter.ai.chat(prompt);
            

            const reply = typeof response === "string" ? response : response.message?.content || "No reply received"
            
            setFormData({...formData, description: reply})

            setAiGenerating(false)

        } catch (error) {
            setAiGenerating(false)
            console.error(error);
            alert("AI generation failed. Try again.");
        }

    }

    const handleRecommendedTags = async () => {
        try {
            setLoadingSuggessions(true)

            if (!window.puter || !window.puter.ai || typeof window.puter.ai.chat !== "function") {
                alert("Puter AI not loaded");
                return;
            }

            const prompt = `Based on this project, list 5-8 relevant technical skills as a comma-separated list (e.g., "React, Node.js, MongoDB"). No explanations, just the skill names.
            Title: ${formData.title}
            Tagline: ${formData.tagline}
            Description: ${formData.description}`;

            const response = await window.puter.ai.chat(prompt);

            const reply = typeof response === "string" ? response : response.message?.content || "No reply received"

            const skills = reply.split(', ')

            console.log(skills);
            

            const matchedSkills = await Promise.all(skills.map(async (skill) => {
                try {
                    const result = await searchSkills(skill.trim());
                    return result[0] || null;
                } catch (err) {
                    console.warn(`Skill not found or failed: ${skill}`);
                    return null; // skip missing ones
                }                          
            }));

            console.log(matchedSkills);

            setSuggestedSkills(matchedSkills.filter(s => s !== null))
            setLoadingSuggessions(false)

        } catch (error) {
            setAiGenerating(false)
            console.error(error);
            alert("AI generation failed. Try again.");
        }
    }



    useEffect(() => {
    if (formData.description && formData.description.length > 50) {
        const timeout = setTimeout(() => {
        handleRecommendedTags();
        }, 2000); 

        return () => clearTimeout(timeout); 
    }
    }, [formData.description]);

  return (
    <div className='p-5 w-full min-h-screen'>
        <h1 className='text-desktop-h4 font-bold'>Share Projects</h1>
        <p className='text-desktop-p text-neutral-13'>Need a team member? share your project/idea and form a team</p> 

       <div className='flex flex-col max-w-3xl mx-auto mt-10'>

            {
                  error && (
                      <div className='bg-red-400/40 rounded-lg  text-red-700 p-2 text-center my-2'>
                              { error }
                      </div>
                  )
              }

              {
                success && (
                      <div className='bg-green-400/40 rounded-lg  text-green-700 p-2 text-center my-2'>
                            { success }
                      </div>
                  )
              }

            <form onSubmit={handleAddProject} className='w-full h-full'>
                <div className='flex items-center gap-5'>
                    <FormField label={'Project Name'} className={'flex-1'} labelClassName='text-neutral-13' placeholder={'Crewmate'} value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required/>
                    <div className="flex-1">
                        <label className="text-neutral-13">Stage</label>
                        <select
                            name="stage" 
                            className="w-full mb-4 mt-2 text-neutral-10 px-4 py-2 rounded-md focus:ring-2 focus:ring-primary-blue focus:outline-none border"
                            value={formData.stage}
                            onChange={(e) => setFormData({...formData, stage: e.target.value})}
                        >
                            <option value="idea">Idea</option>
                            <option value="planning">Planning</option>
                            <option value="development">Development</option>
                            <option value="launch">Launch</option>
                            <option value="maintenance">Maintenance</option>
                        </select>
                    </div>
                </div>
                <div className='flex flex-col'>

                    <FormField label={'Tagline'} labelClassName='text-neutral-13' placeholder={'Find your perfect dev partner'} maxLength={60} value={formData.tagline} onChange={(e) => setFormData({...formData, tagline: e.target.value})} required/>
                    
                    <div className='mt-1'>

                        <div className='w-full flex justify-between items-center'>
                            <label htmlFor="description">Description</label>
                            <Button type='button' onClick={handleDescriptionGenerate} className='text-sm font-medium text-neutral-9' disabled={aiGenerating}>
                                ✨ Generate with AI
                            </Button>
                        </div>

                        <textarea
                            name="description"
                            className={`w-full mb-4 mt-2 text-neutral-10 px-4 py-2 rounded-md focus:ring-2 focus:ring-primary-blue focus:outline-none border`}
                            value={aiGenerating ? "Generating Description..." : formData.description  }
                            disabled={aiGenerating}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            placeholder='A platform for developers to find collaborators for their projects, with team chat and skill matching features.'
                            required
                            rows={5}

                        />

                    </div>

                    <FormField label={'Github URL'}  labelClassName='text-neutral-13' type={"url"} placeholder={'https://github.com/sahilow/crewmate'} value={formData.github_url} onChange={(e) => setFormData({...formData, github_url: e.target.value})} required/>

                </div>
                
                <div className='mb-5'>
                    <label className="text-neutral-13">Skills needed</label>
                    <AsyncSelect
                        loadOptions={loadOptions}
                        defaultOptions
                        isMulti
                        placeholder=""
                        value={formData.skills}
                        onChange={(selectedOptions) => {
                            setFormData(prev => ({
                                ...prev,
                                skills: selectedOptions
                            }))
                        }}
                        required
                    />
                   
                    
                        <div className='mt-4'>
                            <p className='text-neutral-11 mb-2'>
                                Suggested skills (click to add)
                            </p>
                            <div className='flex flex-wrap gap-2 w-full mb-4 mt-2 text-neutral-10 px-4 py-2 rounded-md focus:ring-2 focus:ring-primary-blue focus:outline-none border border-gray-300'>
                            {suggestedSkills.length > 0 ? (

                                suggestedSkills.map((skill, index) => {
                                    const isAlreadyAdded = formData.skills.some(s => s.value === skill.value)

                                    return (
                                        <button
                                            key={index}
                                            type='button'
                                            onClick={() => {
                                                if (!isAlreadyAdded) {
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        skills: [...prev.skills, skill]
                                                    }))
                                                }
                                            }}
                                            disabled={isAlreadyAdded}
                                            className={`px-3 py-1 rounded-full text-sm transition-colors ${
                                                isAlreadyAdded 
                                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                                                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200 cursor-pointer'
                                            }`}
                                        >
                                            {isAlreadyAdded ? '✓ ' : '+ '}{skill.label}
                                        </button>
                                    )
                                })

                                ) : (

                                    <p className='text-center text-sm text-neutral-7'>
                                        {loadingSuggestions ? "Fetching relevent skills..." : "Write description to fetch relevent skills"}
                                    </p>

                                )
                            
                            }
                            </div>
                        </div>
                    
                </div>

                <div>

                </div>

                <div  className='flex justify-end items-center max-sm:mt-14'>
                    <Button type="submit" className='bg-washed-blue border border-primary-blue px-4 py-2 rounded-lg max-sm:w-full'>
                        {loading ? 'Sharing...' : 'Share Project'}
                    </Button>
                </div>

            </form>
        
        </div> 
    </div>
  )
}

export default AddProject