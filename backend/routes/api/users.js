const express = require('express')
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth, requireOrg, requireAdmin } = require('../../utils/auth');
const { User, Organization } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Sign up
const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];
// Sign up for with a new organization 
router.post('/', validateSignup, async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, name  } = req.body;

    const hashedPassword = bcrypt.hashSync(password);
    const org = await Organization.create({name});
    const orgId = org.id
    const user = await User.create({ email, hashedPassword, firstName, lastName, isAdmin: true, orgId})
    
    const safeUser = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user.isAdmin,
      Organization: {
        name: org.name
      }
    }

    await setTokenCookie(res, safeUser);

    return res.json({
      user: safeUser
    })
  } catch (error) {
    next(error);
  }
})


// Sign up user apart of org
router.post('/:orgId', requireOrg, requireAdmin, validateSignup, async (req, res, next) => {
      console.log('Here we are at backend')
      const { email, password, firstName, lastName, isAdmin } = req.body;
      const orgId = parseInt(req.params.orgId);
      const org = await Organization.findByPk(orgId);
      if(!org) {
        const err = new Error("Organization couldn't be found");
        err.status = 404;
        return next(err)
      }

      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({ email, hashedPassword, firstName, lastName, isAdmin, orgId});
  
      const safeUser = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isAdmin: user.isAdmin,
        Organization: {
          name: org.name
        }
      };
  
      return res.json({
        user: safeUser
      });
    }
);

module.exports = router;