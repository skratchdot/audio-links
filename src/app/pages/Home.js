import React, { Component } from 'react';
import { Row, Col, Button, Input, Jumbotron, Label, Glyphicon } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setFilterText } from '../actions/filterText';
import { addTag, deleteTag, clearTags } from '../actions/tags';
import allTags from '../../../data/tags.json';
import urlData from '../../../data/urls.json';

class Home extends Component {
  toggleTag(tag) {
    const { dispatch, tags } = this.props;
    if (tags.indexOf(tag) === -1) {
      dispatch(addTag(tag));
    } else {
      dispatch(deleteTag(tag));
    }
  }
  render() {
    const self = this;
    const { dispatch, filterText, tags } = this.props;
    const clearTagButton = (
      <small>
        <a href="#" onClick={(e) => {
          e.preventDefault();
          dispatch(clearTags());
        }}>
          clear all
        </a>
      </small>
    );
    let extraTag;
    if (tags.length === 0) {
      extraTag = (<small>No tags selected</small>);
    }
    // populate results
    const searchText = filterText.replace(/ +/g, ' ').toLowerCase();
    const results = urlData.filter(function (data) {
      if (tags.length === 0) {
        return true;
      } else {
        for (let i = 0; i < tags.length; i++) {
          if (data.tags.indexOf(tags[i]) > -1) {
            return true;
          }
        }
      }
      return false;
    }).filter(function (data) {
      const props = ['title', 'description', 'tags', 'url'];
      if (filterText === '') {
        return true;
      }
      for (let i = 0; i < props.length; i++) {
        const text = data[props[i]].toString().replace(/\s+/g, ' ').toLowerCase();
        if (text.indexOf(searchText) !== -1) {
          return true;
        }
      }
      return false;
    });
    return (
      <div>
        <Row>
          <Col md={8}>
            <Jumbotron>
              <div>
                <strong>
                  Filter:
                  &nbsp;
                  <small><a href="#" onClick={(e) => {
                      e.preventDefault();
                      dispatch(setFilterText(''));
                    }}>clear text</a></small>
                  <br />
                </strong>
                <Input
                  type="text"
                  placeholder="Filter results..."
                  value={filterText}
                  onInput={(e) => {
                    dispatch(setFilterText(e.target.value));
                  }}
                />
                <div>
                  <strong>
                    Tags:
                    &nbsp;
                    {clearTagButton}
                    <br />
                  </strong>
                  <div>
                    {tags.map(function (tag, i) {
                      return (
                        <Label
                          key={`tag${i}`}
                          onClick={() => {
                            dispatch(deleteTag(tag));
                          }}
                          style={{
                            marginRight: 10,
                            display: 'inline-block',
                            cursor: 'pointer'
                          }}>
                          <Glyphicon glyph="remove" />
                          &nbsp;
                          {tag}
                        </Label>
                      );
                    })}
                    {extraTag}
                  </div>
                </div>
              </div>
            </Jumbotron>
            <hr />
            <div style={{marginBottom: 40}}>
              <h2>Results <small>({results.length})</small>:</h2>
              {results.map(function (data, i) {
                const title = data.title || data.url;
                const color = i % 2 === 0 ? '#efefef' : '#fafafa';
                return (
                  <div
                    key={`url${i}`}
                    style={{
                      backgroundColor: color,
                      padding: 20,
                      borderTop: '1px solid #aaa'
                    }}>
                    <a href={data.url} target="_blank">{title}</a>
                    &nbsp;-&nbsp;
                    {data.description}
                    <div>&nbsp;</div>
                    <div>
                      <small>
                        Tags:
                        {data.tags.map(function (tag, i) {
                          const comma = i > 0 ? ',' : '';
                          return (
                            <span key={`tagLink${i}`}>
                              {comma}
                              &nbsp;
                              <a href="#" onClick={(e) => {
                                  e.preventDefault();
                                  if (tags.indexOf(tag) === -1) {
                                    dispatch(addTag(tag));
                                  }
                                  window.scrollTo(0, 0);
                                }}>
                                {tag}
                              </a>
                            </span>
                          );
                        })}
                      </small>
                    </div>
                  </div>
                );
              })}
            </div>
          </Col>
          <Col md={4}>
            <Jumbotron>
              <h2 style={{marginTop: 0}}>Tags:&nbsp;{clearTagButton}</h2>
              {allTags.map(function (tag, i) {
                return (
                  <Button
                    key={`tag${i}`}
                    bsSize="xsmall"
                    active={tags.indexOf(tag) > -1}
                    onClick={self.toggleTag.bind(self, tag)}>
                    {tag}
                  </Button>
                );
              })}
            </Jumbotron>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(function (state) {
  return {
    filterText: state.filterText,
    tags: state.tags
  };
})(Home);
