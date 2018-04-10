import bindAll from 'lodash.bindall';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import styles from './library-item.css';
import classNames from 'classnames';

class LibraryItem extends React.PureComponent {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleBlur',
            'handleClick',
            'handleFocus',
            'handleKeyPress',
            'handleMouseEnter',
            'handleMouseLeave'
        ]);
    }
    handleBlur () {
        this.props.onBlur(this.props.id);
    }
    handleFocus () {
        this.props.onFocus(this.props.id);
    }
    handleClick (e) {
        if (!this.props.disabled) {
            this.props.onSelect(this.props.id);
        }
        e.preventDefault();
    }
    handleKeyPress (e) {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            this.props.onSelect(this.props.id);
        }
    }
    handleMouseEnter () {
        this.props.onMouseEnter(this.props.id);
    }
    handleMouseLeave () {
        this.props.onMouseLeave(this.props.id);
    }
    render () {
        return this.props.featured ? (
            <div
                className={classNames(
                    styles.libraryItem,
                    styles.featuredItem,
                    {
                        [styles.disabled]: this.props.disabled
                    }
                )}
                onClick={this.handleClick}
            >
                <div className={styles.featuredImageContainer}>
                    {this.props.disabled ? (
                        <div className={styles.comingSoonText}>
                            <FormattedMessage
                                defaultMessage="Coming Soon"
                                description="Label for extensions that are not yet implemented"
                                id="gui.extensionLibrary.comingSoon"
                            />
                        </div>
                    ) : null}
                    {this.props.videoURL ? (
                            // <iframe
                            //     width="300"
                            //     height="250"
                            //     src={`${this.props.videoURL}?rel=0&amp;showinfo=0`}
                            //     frameBorder="0"
                            //     allow="autoplay; encrypted-media"
                            //     allowFullScreen>
                            //     Video not available.
                            // </iframe>
                            <iframe
                                width="300"
                                height="250"
                                src={`${this.props.vimeoURL}?title=0&byline=0&portrait=0;hd_off=0&"`}
                                frameBorder="0"
                                // allow="autoplay; encrypted-media"
                                allowFullScreen>
                                Video not available.
                            </iframe>
                    ) : (
                        <img
                            className={styles.featuredImage}
                            src={this.props.iconURL}
                        />
                    )}
                </div>
                <div
                    className={styles.featuredText}
                >
                    <span className={styles.libraryItemName}>{this.props.name}</span>
                    {this.props.description ? (
                        <span className={styles.featuredDescription}>{this.props.description}</span>
                    ) : null}
                </div>
            </div>
        ) : (
            <Box
                className={styles.libraryItem}
                role="button"
                tabIndex="0"
                onBlur={this.handleBlur}
                onClick={this.handleClick}
                onFocus={this.handleFocus}
                onKeyPress={this.handleKeyPress}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            >
                {/* Layers of wrapping is to prevent layout thrashing on animation */}
                <Box className={styles.libraryItemImageContainerWrapper}>
                    <Box className={styles.libraryItemImageContainer}>
                        <img
                            className={styles.libraryItemImage}
                            src={this.props.iconURL}
                        />
                    </Box>
                </Box>
                <span className={styles.libraryItemName}>{this.props.name}</span>
            </Box>
        );
    }
}

LibraryItem.propTypes = {
    description: PropTypes.string,
    disabled: PropTypes.bool,
    featured: PropTypes.bool,
    iconURL: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onMouseEnter: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired
};

LibraryItem.defaultProps = {
    disabled: false
};

export default LibraryItem;
