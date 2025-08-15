import React, { useState } from 'react'
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
        skills: [
            {
            label: '',
            value: null
            },
        ],
        github_url: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

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

  return (
    <div className='p-5'>
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

            <form onSubmit={handleAddProject}>
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
                    
                    <FormField label={'Description'} labelClassName='text-neutral-13' type={'textarea'} placeholder={'A platform for developers to find collaborators for their projects, with team chat and skill matching features.'} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required/>

                    <FormField label={'Github URL'}  labelClassName='text-neutral-13' type={"url"} placeholder={'https://github.com/sahilow/crewmate'} value={formData.github_url} onChange={(e) => setFormData({...formData, github_url: e.target.value})} required/>

                </div>
                <div className='mb-5'>

                    <label className="text-neutral-13">
                        Skills needed
                    </label>
                    <AsyncSelect

                        loadOptions={loadOptions}
                        defaultOptions
                        isMulti
                        placeholder=""
                        classNames={{
                            control: (state) =>
                            state.isFocused ? 'border-red-600' : 'border-grey-300',
                        }}

                        onChange={(selectedOptions) => {                         
                            setFormData(prev => ({
                                ...prev,
                                skills: selectedOptions
                            }))
                        }}
                        required
                    />
                </div>

                <div type="submit" className='flex justify-end items-center'>
                    <Button className='bg-washed-blue border border-primary-blue px-4 py-2 rounded-lg'>
                        {loading ? 'Sharing...' : 'Share Project'}
                    </Button>
                </div>
            </form>
        
        </div> 
    </div>
  )
}

export default AddProject