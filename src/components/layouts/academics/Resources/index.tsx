import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Select from "react-select";
import { colleges } from "../../../../data/academics/college";
import { departments } from "../../../../data/academics/department";
import { resources } from "../../../../data/academics/resources";
import { universities } from "../../../../data/academics/universities";
import { FilterState } from "../../../../types/academics";
import ResourcesGrid from "./ResourceGrid";

interface SelectOption {
  value: string | number;
  label: string;
}

export default function Resources() {
  const { universityId } = useParams<{ universityId: string }>();
  const universityName = universities.find(
    (uni) => uni.id === universityId
  )?.name;

  const levels: SelectOption[] = [
    { value: 100, label: "100 Level" },
    { value: 200, label: "200 Level" },
    { value: 300, label: "300 Level" },
    { value: 400, label: "400 Level" },
    { value: 500, label: "500 Level" },
  ];

  const [filters, setFilters] = useState<FilterState>({
    level: null,
    collegeId: null,
    departmentId: null,
  });

  const filteredColleges = useMemo(() => {
    return filters.level ? colleges : [];
  }, [filters.level]);

  const filteredDepartments = useMemo(() => {
    return filters.collegeId
      ? departments.filter((dept) => dept.collegeId === filters.collegeId)
      : [];
  }, [filters.collegeId]);

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      if (filters.level && resource.level !== filters.level) return false;
      if (filters.collegeId && resource.collegeId !== filters.collegeId)
        return false;
      if (
        filters.departmentId &&
        resource.departmentId !== filters.departmentId
      )
        return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="max-w-[1120px] w-full mx-auto flex flex-col gap-[50px] py-12 md:py-[100px] md:px-6 lg:px-0">
      <div className="space-y-6">
        <div className="flex flex-col gap-6">
          <Link
            to="/academics"
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors w-fit"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Back to Academics</span>
          </Link>

          <div className="space-y-2">
            <h1 className="text-4xl font-semibold text-primary">
              Academic Resources
            </h1>
            <p className="text-secondary text-lg">
              Explore study materials, past questions, and tutorials from{" "}
              <strong className="text-primary">{universityName}</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Select
              options={levels}
              value={
                levels.find((option) => option.value === filters.level) || null
              }
              onChange={(selected) =>
                setFilters({
                  level: selected ? (selected.value as number) : null,
                  collegeId: null,
                  departmentId: null,
                })
              }
              placeholder="Select Level"
              className="w-40"
            />

            <AnimatePresence>
              {filters.level && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="w-64"
                >
                  <Select
                    options={filteredColleges.map((college) => ({
                      value: college.id,
                      label: college.name,
                    }))}
                    value={
                      filteredColleges
                        .map((college) => ({
                          value: college.id,
                          label: college.name,
                        }))
                        .find((option) => option.value === filters.collegeId) ||
                      null
                    }
                    onChange={(selected) =>
                      setFilters({
                        ...filters,
                        collegeId: selected ? (selected.value as string) : null,
                        departmentId: null,
                      })
                    }
                    placeholder="Select College"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {filters.collegeId && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="w-64"
                >
                  <Select
                    options={filteredDepartments.map((dept) => ({
                      value: dept.id,
                      label: dept.name,
                    }))}
                    value={
                      filteredDepartments
                        .map((dept) => ({
                          value: dept.id,
                          label: dept.name,
                        }))
                        .find(
                          (option) => option.value === filters.departmentId
                        ) || null
                    }
                    onChange={(selected) =>
                      setFilters({
                        ...filters,
                        departmentId: selected
                          ? (selected.value as string)
                          : null,
                      })
                    }
                    placeholder="Select Department"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <ResourcesGrid resources={filteredResources} />
      </div>
    </div>
  );
}
