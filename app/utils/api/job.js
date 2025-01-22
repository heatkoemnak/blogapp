export const fetchJobs = async () => {
  try {
    const response = await fetch('/api/jobs', { cache: 'no-store' });
    if (!response.ok) {
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const fetchAnnouncement = async () => {
  try {
    const response = await fetch('/api/announcement', { cache: 'no-store' });
    if (!response.ok) {
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const fetchIndustry = async () => {
  try {
    const response = await fetch('/api/jobs/industry', { cache: 'no-store' });
    if (!response.ok) {
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const fetchJobType = async () => {
  try {
    const response = await fetch('/api/jobs/type', { cache: 'no-store' });
    if (!response.ok) {
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const fetchJobLevel = async () => {
  try {
    const response = await fetch('/api/jobs/level', { cache: 'no-store' });
    if (!response.ok) {
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const fetchJobSalary = async () => {
  try {
    const response = await fetch('/api/jobs/salary', { cache: 'no-store' });
    if (!response.ok) {
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const fetchJobCategory = async () => {
  try {
    const response = await fetch('/api/jobs/category', { cache: 'no-store' });
    if (!response.ok) {
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const fetchCountry = async () => {
  try {
    const response = await fetch('/api/jobs/location/country', {
      cache: 'no-store',
    });
    if (!response.ok) {
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchProvinceCity = async () => {
  try {
    const response = await fetch('/api/jobs/location/province.city', {
      cache: 'no-store',
    });
    if (!response.ok) {
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const fetchDistrict = async () => {
  try {
    const response = await fetch('/api/jobs/location/district.khan', {
      cache: 'no-store',
    });
    if (!response.ok) {
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const fetchCommune = async () => {
  try {
    const response = await fetch('/api/jobs/location/commune.sangkat', {
      cache: 'no-store',
    });
    if (!response.ok) {
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const fetchCompanies = async () => {
  try {
    const response = await fetch('/api/companies', {
      cache: 'no-store',
    });
    if (!response.ok) {
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
