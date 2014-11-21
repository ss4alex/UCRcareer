angular.module('huntEdu.services')
    .factory('JobPost', function JobPostFactory() {
        var forEach = angular.forEach,
            isObject = angular.isObject,
            copy = angular.copy;

        var copyNonNull = function(src, dest) {
            if(dest) {
                copy(src, dest);
            } else {
                dest = copy(src); 
            }

            if(isObject(dest)) {
                forEach(dest, function(value, key) {
                    if(!value) {
                        delete dest[key];
                    }
                });
            }
            return dest;
        };

        var JOB_POST_DATA_FIELDS = ['meta','specifics', 'location', 
                            'date', 'media', 'tags'];
        
        function JobPost(data) {
           var self = this;
           forEach(data, function(value, key) {         
                if(JOB_POST_DATA_FIELDS.indexOf(key) !== -1) {
                   self[key] = copyNonNull(value);
                }
            });
        }

        JobPost.prototype = {
            'meta': {
                'id': null
            },
            'specifics': {
                'jobTitle': null, 
                'description': null, 
                'requirements': null, 
                'salary': null,
                'companyName': null,
                'department': null,
                'jobType': null
            },
            'location': {
                'city': null,
                'state': null
            },
            'date': {
                'postedOn': null,
                'endsOn': null
            }, 
            'media': {
                'image': null,
                'video': null
            },
            'tags': []
        };
        
        JobPost.prototype.getId = function() {
            return this.meta.id;
        };

        JobPost.getJobPostDataFields = function() {
            return JOB_POST_DATA_FIELDS;
        };

        JobPost.prototype.getImage = function() {
            return this.media.image;
        };

        JobPost.prototype.hasImage = function() {
            return !!this.media.image;
        };

        JobPost.prototype.getVideo = function() {
            return this.media.video;
        };
        
        JobPost.prototype.hasVideo = function() {
            return !!this.media.video;
        };

        JobPost.prototype.setJobPostData = function(data) {
            var self = this;
            forEach(data, function(value, key) {
                if(JOB_POST_DATA_FIELDS.indexOf(key) !== -1) {
                   self[key] = copyNonNull(value);
                }
            });
        };

        JobPost.prototype.getJobPostData = function() {
            var info = {};
            forEach(this, function(value, key) {
                forEach(JOB_POST_DATA_FIELDS, function(jobPostDataField) {
                    if(value && (key === jobPostDataField)) {
                        info[jobPostDataField] = 
                            copyNonNull(value);
                    }
                });  
            });
            return info;
        };
        
         return JobPost;
    });