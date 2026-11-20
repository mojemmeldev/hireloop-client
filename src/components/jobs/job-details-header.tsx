"use client"
import { BadgeCheckIcon, BookmarkIcon } from "lucide-react";

import { jobDetailsStyles } from "@/lib/styles/job-details";
import type { JobRow } from "@/lib/types/jobs";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { applyToAJOb } from "@/lib/actions/applications";

export function JobDetailsHeader({ job }: { job: JobRow }) {
    const {data:session}=useSession()
    const user= session?.user;
    
    const router= useRouter()


    const companyInitial = job.company.trim().charAt(0).toUpperCase() || "?";

    const handleApplyNow=async ()=>{
        console.log("Apply button clicked!");
        console.log("User:", user);

        if (!user){
            router.push(`/sign-in?redirectTo=/browser-jobs/${job._id}`)

            return
        }
        else if (user.role ==="seeker"){
            console.log("Seeker detected!");
                //save the application to the database
                // todo: only send jobId and userId or email address for the application
            const application={
                jobId: job._id,
                userId: user.id,
                name:user.name,
                email:user.email,
                jobTitle:job.title,
                companyName:job.company,
            }
            const result =await applyToAJOb(application);
            console.log("result apply" ,result);
            if(result.insertedId){
                console.log("Application submitted seccessfully");
                router.push('/browser-jobs')
            }
        }
        else{
            console.log("user is not seeker");
        }
    }

    return (
        <header className={jobDetailsStyles.header}>
            <div className={jobDetailsStyles.headerGlow} aria-hidden="true" />

            <div className={jobDetailsStyles.headerMain}>
                <div className={jobDetailsStyles.identity}>
                    <div className={jobDetailsStyles.companyLogo}>{companyInitial}</div>

                    <div className="min-w-0">
                        <h1 className={jobDetailsStyles.jobTitle}>{job.title}</h1>
                        <div className={jobDetailsStyles.jobMeta}>
                            <span>{job.company}</span>
                            <span className={jobDetailsStyles.dot} aria-hidden="true" />
                            <span className={jobDetailsStyles.verified}>
                                <BadgeCheckIcon className="size-4" />
                                Verified Employer
                            </span>
                        </div>
                    </div>
                </div>

                <div className={jobDetailsStyles.headerActions}>
                    <button
                        type="button"
                        aria-label={`Save ${job.title}`}
                        className={jobDetailsStyles.iconButton}
                    >
                        <BookmarkIcon className="size-[18px]" />
                    </button>
                    <button onClick={handleApplyNow} type="button" className={jobDetailsStyles.applyButton}>
                        Apply Now
                    </button>
                </div>
            </div>
        </header>
    );
}
