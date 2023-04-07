import React from 'react';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getActivities, getCountries, postActivity } from '../../redux/actions/actions';
import { useHistory } from 'react-router-dom';
import s from './activityCreate.module.css';
// import tacho from '../../images/tacho.png';
import { Link } from 'react-router-dom';
import Loading from '../Loading/LoadingComponent';


const tab = '\u00A0';

export default function ActivityCreate() {

    const dispatch = useDispatch()
    let allCountries = useSelector(state => state.allCountries)
    const history = useHistory()
    const activities = useSelector(state => state.activities)

    useEffect(() => {
        setIsLoading(true);
        dispatch(getCountries());
        dispatch(getActivities());
    }, [dispatch])

    function validate(input) {
        let errors = {}
        if (!input.name) errors.name = 'Activity name is required'
        if (input.name.length > 25) errors.name = 'Activity name must have a maximum of 25 characters'
        if (input.name && !/^[A-Za-z0-9\s]+$/.test(input.name)) errors.name = 'Name must have only letters, numbers and spaces'
        let activityExist = activities.filter(a => a.name.toLowerCase() === input.name.toLowerCase())
        if (activityExist.length > 0) errors.name = 'That activity already exists'
        if (!input.difficult) errors.difficult = 'Choose one'
        if (!input.duration) errors.duration = 'Duration is required'
        if (input.duration && !/^[0-9]+([.][0-9]+)?$/.test(input.duration)) errors.duration = 'Duration must be integer or decimal'
        if (input.duration <= 0) errors.duration = 'Duration cannot be 0'
        if (input.duration > 100) errors.duration = 'Duration cannot be higher than 100'
        if (!input.season) errors.season = 'Choose one'
        if (input.countries.length === 0) errors.countries = 'Select at least one Country'

        return errors
    }

    const [input, setInput] = useState({
        name: '',
        difficult: '',
        duration: '',
        season: '',
        countries: []
    })

    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSelectCountries(e) {
        if (!input.countries.includes(e.target.value)) {
            setInput({
                ...input,
                countries: [...input.countries, e.target.value]
            })
            setErrors(validate({
                ...input,
                countries: e.target.value
            }))
        }
        else {
            alert('That Country has already been selected')
        }
    }

    function handleCheck(e) {
        setInput({
            ...input,
            season: e.target.value
        })
        setErrors(validate({
            ...input,
            season: e.target.value
        }))
    }

    function handleSelect(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(postActivity(input))
        alert('Actividad creada')
        setInput({
            name: '',
            difficult: '',
            duration: '',
            season: '',
            countries: []
        })
        history.push('/home')
    }

    function handleDelete(el) {
        setInput({
            ...input,
            countries: input.countries.filter(c => c !== el)
        })
    }

    if (isLoading) {
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
        return <Loading />
    }

    return (
        <div className={s.fondo}>
            <div id={s.rect}>
                <div id={s.title}>
                    <h1> Create Activity</h1>
                </div>
                <form className={s.form} onSubmit={handleSubmit}>
                    <div id={s.div1}>
                        <label> Name: </label>
                        <input type='text'
                            value={input.name}
                            name='name'
                            autoComplete='off'
                            onChange={handleChange}
                            className={s.input1} />

                        {
                            errors.name && (
                                <div className={s.error}>
                                    <span> {errors.name}</span>
                                </div>
                            )
                        }
                    </div>
                    <div>
                        <label> Difficult: </label>
                        <select id={s.select1} value={input.difficult} name='difficult' onChange={handleSelect} >
                            <option value="" disabled>Please select</option>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                        </select>
                        {
                            errors.difficult && (
                                <div className={s.error}>
                                    <span> {errors.difficult}</span>
                                </div>
                            )
                        }
                    </div>
                    <div>
                        <label> Duration: (in hs)</label>
                        <input type='number'
                            value={input.duration}
                            name='duration'
                            autoComplete='off'
                            min='0'
                            step='0.5'
                            onChange={handleChange}
                            className={s.input2}
                        />
                        {
                            errors.duration && (
                                <div className={s.error}>
                                    <span> {errors.duration}</span>
                                </div>
                            )
                        }
                    </div>
                    <div>
                        <label id={s.labseason}> Season: </label>
                        <label>
                            <input
                                type='radio'
                                name='season'
                                value='Summer'
                                onChange={handleCheck} />
                            Summer

                        </label>
                        <label>
                            <input type='radio'
                                name='season'
                                value='Autumn'
                                onChange={handleCheck} />
                            Autumn
                        </label>
                        <br />
                        <label id={s.labseason2}>
                            <input type='radio'
                                name='season'
                                value='Winter'
                                onChange={handleCheck} />
                            Winter {tab}
                        </label>
                        <label>
                            <input type='radio'
                                name='season'
                                value='Spring'
                                onChange={handleCheck} />
                            Spring
                        </label>
                        {
                            errors.season && (
                                <div className={s.error}>
                                    <span> {errors.season}</span>
                                </div>
                            )
                        }
                    </div>
                    <div>
                        <label> Countries: </label>
                        <select id={s.select2} value={input.countries} onChange={handleSelectCountries} >
                            <option value="">Please select</option>
                            {
                                allCountries && allCountries.map(c => (
                                    <option value={c.name} key={c.id}> {c.name} </option>
                                ))
                            }
                        </select>
                        {
                            errors.countries && (
                                <div className={s.error}>
                                    <span> {errors.countries}</span>
                                </div>
                            )
                        }
                    </div>
                    <button type='submit'
                        disabled={!input.name || !input.season || !input.difficult || !input.duration || !input.season || input.countries.length === 0 ||
                            errors.name || errors.season || errors.difficult || errors.duration || errors.season || errors.countries}
                        className={s.btn}>
                        Create Activity
                    </button>
                </form>
            </div>
            <div className={s.rect2}>
                <div>
                    <p>Countries selected: {input.countries.length}</p>
                </div>
                <div className={s.countrySelect}>
                    {input.countries.map(c =>
                        <div key={c} className={s.country}>
                            <span>
                                {c}
                            </span>
                            <button onClick={() => handleDelete(c)}>
                                <img  alt="x" width='17px' height='17px' />
                            </button>
                        </div>
                    )
                    }
                </div>
            </div>
            <div className={s.btnback}>
                <Link to='/home'>
                    <button> Back to countries </button>
                </Link>
            </div>
        </div>
    )
}