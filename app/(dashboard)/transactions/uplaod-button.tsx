import { Upload } from "lucide-react";
import { useCSVReader } from "react-papaparse";
import { Button } from "@/components/ui/button";

interface CSVResult {
    data: string[][];
    errors: any[];
    meta: {
        delimiter: string;
        linebreak: string;
        aborted: boolean;
        truncated: boolean;
        cursor: number;
    };
}

type Props = {
    onUpload: (results: CSVResult) => void;
};

export const UploadButton = ({ onUpload }: Props) => {
    const { CSVReader } = useCSVReader();
    return (
        <CSVReader onUploadAccepted={onUpload}>
            {({ getRootProps }: { getRootProps: () => any }) => (
                <Button
                    size="sm"
                    className="w-full lg:w-auto"
                    {...getRootProps()}>
                    <Upload className="size-4 mr-2"/>
                    Import 
                </Button>
            )}
        </CSVReader>
    );
};
