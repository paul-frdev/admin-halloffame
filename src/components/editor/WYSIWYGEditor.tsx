import { ContentState, convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { Map } from 'immutable';
import React, { ForwardedRef, forwardRef, useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

type WYSIWYGEditorProps = {
  onChange?: (value: any) => void;
  value?: string;
}

const WYSIWYGEditor = forwardRef(
  ({ onChange, value, ...props }: WYSIWYGEditorProps,  ref: ForwardedRef<Editor>) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [updated, setUpdated] = useState(false);

    useEffect(() => {
      if (!updated) {
        const defaultValue = value ? value : "";
        const blocksFromHtml = htmlToDraft(defaultValue);
        const contentState = ContentState.createFromBlockArray(
          blocksFromHtml.contentBlocks,
          blocksFromHtml.entityMap
        );
        const newEditorState = EditorState.createWithContent(contentState);
        setEditorState(newEditorState);
      }
    }, [value]);

    const onEditorStateChange = (editorState: any) => {
      setUpdated(true);

      setEditorState(editorState);

      return onChange?.(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    };

    // const customRenderMap = Map({
    //   unstyled: {
    //     element: 'div',
    //     // will be used in convertFromHTMLtoContentBlocks
    //     aliasedElements: ['p'],
    //   },
    // });

    return (
      <React.Fragment>
        <div className="editor bg-white px-2">
          <Editor
            ref={ref}
            spellCheck
            editorState={editorState}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            onEditorStateChange={onEditorStateChange}
          />
        </div>
      </React.Fragment>
    );
  }
)

export default WYSIWYGEditor;