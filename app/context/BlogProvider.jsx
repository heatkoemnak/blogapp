'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { fetchCategories, fetchPosts } from '../utils/api';
import {
  fetchJobCategory,
  fetchIndustry,
  fetchJobType,
  fetchJobLevel,
  fetchJobSalary,
  fetchCountry,
  fetchProvinceCity,
  fetchDistrict,
  fetchCommune,
  fetchJobs,
} from '../utils/api/job';

const BlogContext = createContext();

export function BlogProvider({ children }) {
  const [categoryList, setCategoryList] = useState([]);
  const [postList, setPostList] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [industriesList, setIndustriesList] = useState([]);
  const [jobTypes, steJobTypes] = useState([]);
  const [jobLevels, setJobLevels] = useState([]);
  const [jobSalaries, setJobSalaries] = useState([]);
  const [jobCategories, setJobCategories] = useState([]);
  const [countries, setCountry] = useState([]);
  const [provinceCities, setProvinceCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  //set communes
  const [communes, setCommunes] = useState([]);

  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log(industriesList);
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [
          jobs,
          categories,
          posts,
          industry,
          jobType,
          jobLevel,
          jobSalary,
          jobCategory,
          countries,
          provinceCity,
          districts,
          communes,
        ] = await Promise.all([
          fetchJobs(),

          fetchCategories(),
          fetchPosts(),
          fetchIndustry(),
          fetchJobType(),
          fetchJobLevel(),
          fetchJobSalary(),
          fetchJobCategory(),
          fetchCountry(),
          fetchProvinceCity(),
          fetchDistrict(),
          fetchCommune(),
        ]);
        setJobs(jobs);
        setCategoryList(categories);
        setPostList(posts);
        setIndustriesList(industry);
        steJobTypes(jobType);
        setJobLevels(jobLevel);
        setJobSalaries(jobSalary);
        setJobCategories(jobCategory);
        setCountry(countries);
        setProvinceCities(provinceCity);
        setDistricts(districts);
        setCommunes(communes);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <BlogContext.Provider
      value={{
        isLoading,
        errorMessage,
        postList,
        categoryList,
        setCategoryList,
        jobs,
        industriesList,
        jobTypes,
        jobLevels,
        jobSalaries,
        jobCategories,
        countries,
        provinceCities,
        districts,
        communes,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}

export function useBlogContext() {
  return useContext(BlogContext);
}
