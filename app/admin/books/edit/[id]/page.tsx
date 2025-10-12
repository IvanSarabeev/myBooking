import { FC, Fragment } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import BookForm from "@/components/admin/forms/BookForm";

const EditBookPage: FC = () => {
  return (
    <Fragment>
      <Button className="back-btn bg-primary-admin" asChild>
        <Link href="/admin/books">Go Back</Link>
      </Button>

      <section className="w-full max-w-4xl">
        <BookForm />
      </section>
    </Fragment>
  );
};

export default EditBookPage;
