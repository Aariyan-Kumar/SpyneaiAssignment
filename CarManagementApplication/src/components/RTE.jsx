import React from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

function RTE({
    name,
    control,
    label,
    defaultValue = ''
}) {
    return (
        <>
            {label && <label className='text-lg font-medium'>{label}</label>}

            <Controller
                name={name || "description"}
                control={control}
                render={({ field: { onChange } }) => (
                    <Editor
                        apiKey='ldj1rfu2qrvpetounjgtmjmqrcbi3nadnioyjs1id86vktq4'
                        initialValue={defaultValue}
                        init={{
                            initialValue: defaultValue,
                            height: 350,
                            menubar: true,
                            plugins: ['advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />

        </>
    )
}

export default RTE
