'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { fetchCategories } from '../utils/api';
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
  fetchAnnouncement,
  fetchCompanies
} from '../utils/api/job';

const BlogContext = createContext();

export function BlogProvider({ children }) {
  const [categoryList, setCategoryList] = useState([]);
  const [announcement, setAnnouncement] = useState([]);
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

  const [companies, setCompanies] = useState([]);

  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log(companies);
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [
          jobs,
          categories,
          industry,
          jobType,
          jobLevel,
          jobSalary,
          jobCategory,
          countries,
          provinceCity,
          districts,
          communes,
          announcement,
          companies
        ] = await Promise.all([
          fetchJobs(),
          fetchCategories(),
          fetchIndustry(),
          fetchJobType(),
          fetchJobLevel(),
          fetchJobSalary(),
          fetchJobCategory(),
          fetchCountry(),
          fetchProvinceCity(),
          fetchDistrict(),
          fetchCommune(),
          fetchAnnouncement(),
          fetchCompanies()
        ]);
        setJobs(jobs);
        setCategoryList(categories);
        setIndustriesList(industry);
        steJobTypes(jobType);
        setJobLevels(jobLevel);
        setJobSalaries(jobSalary);
        setJobCategories(jobCategory);
        setCountry(countries);
        setProvinceCities(provinceCity);
        setDistricts(districts);
        setCommunes(communes);
        setAnnouncement(announcement);
        setCompanies(companies);
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
        announcement,
        categoryList,
        setCategoryList,
        announcement,
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
        companies
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}

export function useBlogContext() {
  return useContext(BlogContext);
}
