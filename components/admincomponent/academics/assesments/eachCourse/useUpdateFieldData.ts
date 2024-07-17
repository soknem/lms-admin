import { useUpdateCourseAssessmentMutation } from "@/lib/features/admin/academic-management/assesment/assessment";

const useUpdateFieldData = () => {
    const [updateCourseAssessment] = useUpdateCourseAssessmentMutation();

    const updateFieldData = async (uuid: string, columnId: string, value: any) => {
        try {
            const updatedData = { [columnId]: value }; // Construct the update body dynamically
            await updateCourseAssessment({ uuid, updatedData });
            console.log(`Field ${columnId} updated successfully with value:`, value);
        } catch (error) {
            console.error('Error updating field:', error);
        }
    };

    return updateFieldData;
};

export default useUpdateFieldData;
